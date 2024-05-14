import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Categories' })
export class Category extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  category_id: number

  @Column({ type: 'json' })
  @ApiProperty()
  category_name: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  category_image?: string

  @Column({ type: 'json', default: { ru: '', en: '' } })
  @ApiProperty()
  category_description: string
}
