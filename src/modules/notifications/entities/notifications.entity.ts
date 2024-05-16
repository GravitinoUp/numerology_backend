import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Notifications' })
export class Notification extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  notification_uuid: string

  @Column({ type: 'json' })
  @ApiProperty()
  notification_name: string

  @Column({ type: 'json', default: { ru: '', en: '' } })
  @ApiProperty()
  notification_content: string

  @Column({ type: 'varchar', array: true })
  @ApiProperty()
  notification_users: string

  @Column({ type: 'varchar', array: true })
  @ApiProperty()
  notification_topics: string
}
