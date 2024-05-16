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

      const result = []
      for (const notification of notifications) {
        const formattedNotification = Object.assign(notification, {
          notification_name: JSON.parse(notification.notification_name)[language_code] as string,
          notification_content: JSON.parse(notification.notification_content)[
            language_code
          ] as string,
        })

        result.push(formattedNotification)
      }

      return result
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
