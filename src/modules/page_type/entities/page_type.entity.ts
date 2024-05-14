import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Category } from 'src/modules/category/entities/category.entity'
import { Page } from 'src/modules/page/entities/page.entity'
import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'PageTypes' })
export class PageType extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  page_type_id: number

  @Column({ type: 'json' })
  @ApiProperty()
  page_type_name: string

  @Column({ type: 'json', default: { ru: '', en: '' } })
  @ApiProperty()
  page_type_description: string

  @Column()
  @ApiProperty()
  category_id: number

  @ManyToOne(() => Category, (category) => category.category_id)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'category_id' })
  @ApiProperty()
  category: Category

  @OneToMany(() => Page, (page) => page.page_type, { cascade: true, eager: true })
  pages: Page[]
}
