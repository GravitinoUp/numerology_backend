import { ApiProperty } from '@nestjs/swagger'
import Model from 'src/modules/app/entities/model'
import { Page } from 'src/modules/page/entities/page.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'PageTypes' })
export class PageType extends Model {
  @PrimaryColumn()
  @ApiProperty()
  page_type_id: number

  @Column({ type: 'json' })
  @ApiProperty()
  page_type_name: string

  @Column({ type: 'json', default: { ru: '', en: '' } })
  @ApiProperty()
  page_type_description: string

  @OneToMany(() => Page, (page) => page.page_type, { cascade: true, eager: true })
  pages: Page[]
}
