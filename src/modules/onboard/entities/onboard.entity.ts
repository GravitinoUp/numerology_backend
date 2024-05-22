import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Onboards' })
export class Onboard extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  onboard_id: number

  @Column({ type: 'json', default: { en: '', ru: '' } })
  @ApiProperty()
  onboard_name: string

  @Column()
  @ApiProperty()
  onboard_image: string

  @Column({ type: 'json', default: { en: '', ru: '' } })
  @ApiProperty()
  onboard_description: string
}
