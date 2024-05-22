import {
  Controller,
  Post,
  Body,
  UseFilters,
  HttpStatus,
  HttpException,
  Req,
  Get,
  UseGuards,
  Patch,
  Delete,
  Inject,
} from '@nestjs/common'
import { UserService } from './user.service'
import {
  CheckUserExistsDto,
  CreateUserDto,
  ResetUserPasswordDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from './dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { I18nService } from 'nestjs-i18n'
import { StatusUserResponse, UserResponse } from './response'
import { AppStrings } from 'src/common/constants/strings'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ActiveGuard } from '../auth/guards/active.guard'
import { AuthCodeService } from '../auth_code/auth_code.service'
import { CreateAuthCodeDto } from '../auth_code/dto'
import { Throttle } from '@nestjs/throttler'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { CacheRoutes } from 'src/common/constants/constants'

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authCodeService: AuthCodeService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.USERS_CREATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.USERS_CREATE_RESPONSE,
    type: StatusUserResponse,
  })
  @Throttle({ default: { limit: 1, ttl: 1000 } })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isUserExists = await this.userService.isUserExists({
      phone: createUserDto.phone,
      email: createUserDto.email,
    })

    if (isUserExists) {
      throw new HttpException(await this.i18n.t('errors.user_exists'), HttpStatus.CONFLICT)
    }

    const authCodeDto = new CreateAuthCodeDto()
    authCodeDto.auth_code = createUserDto.code
    authCodeDto.email = createUserDto.email
    authCodeDto.phone = createUserDto.phone

    const codeExists = await this.authCodeService.activateCode(authCodeDto, false)
    if (codeExists) {
      const result = await this.userService.create(createUserDto, authCodeDto)
      await this.clearCache()
      return result
    } else {
      throw new HttpException(await this.i18n.t('errors.invalid_code'), HttpStatus.BAD_REQUEST)
    }
  }

  @ApiOperation({ summary: AppStrings.USERS_CHECK_EXISTS_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.USERS_CHECK_EXISTS_RESPONSE,
    type: StatusUserResponse,
  })
  @Post('check-exists')
  async checkExists(@Body() userData: CheckUserExistsDto): Promise<StatusUserResponse> {
    const isUserExists = await this.userService.isUserExists({
      phone: userData.phone,
    })
    return { status: isUserExists }
  }

  @ApiOperation({ summary: AppStrings.USERS_GET_CURRENT_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.USERS_GET_CURRENT_RESPONSE,
    type: UserResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get()
  async getCurrent(@Req() request) {
    const key = `${CacheRoutes.USERS}/my/${request.user.user_uuid}-${request.i18nLang}`
    let result: UserResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.userService.findByUuid(request.user.user_uuid)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.USERS_UPDATE_CURRENT_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.USERS_UPDATE_CURRENT_RESPONSE,
    type: StatusUserResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch('my')
  async updateCurrent(@Body() user: UpdateUserDto, @Req() request) {
    const isUserExists = await this.userService.isUserExists({ user_uuid: request.user.user_uuid })
    if (!isUserExists) {
      throw new HttpException(await this.i18n.t('errors.user_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.userService.update(user, request.user.user_uuid)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.USERS_UPDATE_PASSWORD_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.USERS_UPDATE_PASSWORD_RESPONSE,
    type: StatusUserResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch('password')
  async updatePassword(@Body() updateUserPasswordDto: UpdateUserPasswordDto, @Req() request) {
    const result = await this.userService.updatePassword(
      updateUserPasswordDto,
      request.user.user_uuid,
    )
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.USERS_RESET_PASSWORD_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.USERS_RESET_PASSWORD_RESPONSE,
    type: StatusUserResponse,
  })
  @Throttle({ default: { limit: 1, ttl: 30000 } })
  @Patch('password/reset')
  async resetPassword(@Body() resetUserPasswordDto: ResetUserPasswordDto) {
    const result = await this.userService.resetPassword(resetUserPasswordDto)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.USERS_DELETE_CURRENT_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.USERS_DELETE_CURRENT_RESPONSE,
    type: StatusUserResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete('my')
  async deleteCurrent(@Req() request) {
    const result = await this.userService.delete(request.user.user_uuid)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PAGES}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
