import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Category } from 'src/modules/category/entities/category.entity'

@Entity({ name: 'Pages' })
export class Page extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  page_uuid: string

  @Column({ type: 'json', default: { en: '', ru: '' } })
  @ApiProperty()
  page_name: string

  @Column({ type: 'json', default: { en: '', ru: '' } })
  @ApiProperty()
  page_description: string

  @Column({ type: 'varchar' })
  @ApiProperty()
  page_image: string

  @Column({ type: 'varchar' })
  @ApiProperty()
  page_icon: string

  @Column({ type: 'varchar' })
  @ApiProperty()
  color: string

  @Column({ type: 'varchar', array: true })
  @ApiProperty()
  key: string

  @Column()
  @ApiProperty()
  category_id: number

  @Column()
  @ApiProperty()
  is_active: boolean

  @ManyToOne(() => Category, (category) => category.category_id)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'category_id' })
  @ApiProperty()
  category: Category
}
