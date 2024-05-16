import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'

export class NotificationResponse {
  @IsUUID()
  @ApiProperty()
  notification_uuid: string

  @IsString()
  @ApiProperty()
  notification_name: string

  @IsString()
  @ApiProperty()
  notification_content: string

  @IsArray()
  @ApiProperty()
  notification_users: string

  @IsArray()
  @ApiProperty()
  notification_topics: string
}

export class StatusNotificationResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: NotificationResponse
}
