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
import { CreateUserDto, UpdateUserDto } from './dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { I18nService } from 'nestjs-i18n'
import { StatusUserResponse } from './response'
import { AppStrings } from 'src/common/constants/strings'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ActiveGuard } from '../auth/guards/active.guard'
import { User } from './entities/user.entity'

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  @ApiOperation({ summary: AppStrings.USERS_CREATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.USERS_CREATE_RESPONSE,
    type: StatusUserResponse,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isUserExists = await this.userService.isUserExists({
      phone: createUserDto.phone,
      email: createUserDto.email,
    })

    if (isUserExists) {
      throw new HttpException(await this.i18n.t('errors.user_exists'), HttpStatus.CONFLICT)
    }

    const result = await this.userService.create(createUserDto)
    return result
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
