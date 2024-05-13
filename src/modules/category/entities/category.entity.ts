import { ApiProperty } from '@nestjs/swagger'
import Model from 'src/modules/app/entities/model'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Categories' })
export class Category extends Model {
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
