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
} from '@nestjs/common'
import { UserService } from './user.service'
import { CheckUserExistsDto, CreateUserDto, UpdateUserDto } from './dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { I18nService } from 'nestjs-i18n'
import { StatusUserResponse } from './response'
import { AppStrings } from 'src/common/constants/strings'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ActiveGuard } from '../auth/guards/active.guard'
import { User } from './entities/user.entity'
import { AuthCodeService } from '../auth_code/auth_code.service'
import { CreateAuthCodeDto } from '../auth_code/dto'
import { Throttle } from '@nestjs/throttler'

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authCodeService: AuthCodeService,
    private readonly i18n: I18nService,
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
    type: User,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get()
  async getCurrent(@Req() request) {
    const result = await this.userService.findByUuid(request.user.user_uuid)

    return result
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
    return result
  }
}
