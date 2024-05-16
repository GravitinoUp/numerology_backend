import { Body, Controller, Get, HttpStatus, Post, Req, UseFilters, UseGuards } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { NotificationResponse, StatusNotificationResponse } from './response'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { I18nService } from 'nestjs-i18n'
import { RolesEnum } from 'src/common/constants/constants'
import { Roles } from '../role/guards/decorators/role.decorator'
import { RolesGuard } from '../role/guards/roles.guard'
import { CreateNotificationDto } from './dto'

@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('notifications')
@UseFilters(AllExceptionsFilter)
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly i18n: I18nService,
  ) {}

  @ApiOperation({ summary: AppStrings.NOTIFICATIONS_CREATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.NOTIFICATIONS_CREATE_RESPONSE,
    type: StatusNotificationResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const result = await this.notificationsService.create(createNotificationDto)
    return result
  }

  @ApiOperation({ summary: AppStrings.NOTIFICATIONS_GET_MY_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.NOTIFICATIONS_GET_MY_RESPONSE,
    type: NotificationResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('my')
  async findMy(@Req() request) {
    const result = await this.notificationsService.findMy(request.user.user_uuid, request.i18nLang)
    return result
  }
}
