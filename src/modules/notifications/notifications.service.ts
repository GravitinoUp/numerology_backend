import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NotificationResponse, StatusNotificationResponse } from './response'
import { UserService } from '../user/user.service'
import { Notification } from './entities/notifications.entity'
import { CreateNotificationDto } from './dto'

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private readonly userService: UserService,
  ) {}

  async create(notification: CreateNotificationDto): Promise<StatusNotificationResponse> {
    try {
      const newNotification = await this.notificationRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...notification,
        })
        .returning('*')
        .execute()

      return { status: true, data: newNotification.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findMy(user_uuid: string, language_code: string): Promise<NotificationResponse[]> {
    try {
      const userData = await this.userService.findByUuid(user_uuid)

      const notifications = await this.notificationRepository
        .createQueryBuilder()
        .select()
        .where('notification_users && :notification_tokens', {
          notification_tokens: userData.notification_tokens,
        })
        .orWhere('notification_topics && :notification_topics', {
          notification_topics: userData.notification_topics,
        })
        .getMany()

      const result = this.formatLocalization(notifications, language_code)
      return result
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  formatLocalization(data: Notification[], language_code: string): NotificationResponse[] {
    const result = []
    for (const object of data) {
      const formattedObject = Object.assign(object, {
        notification_name: JSON.parse(object.notification_name)[language_code] as string,
        notification_content: JSON.parse(object.notification_content)[language_code] as string,
      })

      result.push(formattedObject)
    }

    return result
  }
}
