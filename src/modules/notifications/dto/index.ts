import { ApiProperty } from '@nestjs/swagger'
import { IsJSON, IsArray } from 'class-validator'

export class CreateNotificationDto {
  @IsJSON()
  @ApiProperty()
  notification_name: string

  @IsJSON()
  @ApiProperty()
  notification_content: string

  @IsArray()
  @ApiProperty({ default: [] })
  notification_users: string

  @IsArray()
  @ApiProperty({ default: [] })
  notification_topics: string
}
