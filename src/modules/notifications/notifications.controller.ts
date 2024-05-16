import { Controller, Get, HttpStatus, Req, UseFilters, UseGuards } from '@nestjs/common'
import { NotificationsService } from './notifications.service'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { NotificationResponse } from './response'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'

@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('notifications')
@UseFilters(AllExceptionsFilter)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

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
