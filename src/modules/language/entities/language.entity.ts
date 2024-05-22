import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Languages' })
export class Language extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  language_code: string

  @Column()
  @ApiProperty()
  language_name: string
}
