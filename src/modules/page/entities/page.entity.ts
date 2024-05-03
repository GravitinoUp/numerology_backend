import { ApiProperty } from '@nestjs/swagger'
import Model from 'src/modules/app/entities/model'
import { Language } from 'src/modules/language/entities/language.entity'
import { PageType } from 'src/modules/page_type/entities/page_type.entity'
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

@Entity({ name: 'Pages' })
export class Page extends Model {
  @PrimaryColumn()
  @ApiProperty()
  page_uuid: string

  @Column()
  @ApiProperty()
  page_type_id: number

  @ManyToOne(() => PageType, (pageType) => pageType.page_type_id)
  @JoinColumn({ name: 'page_type_id', referencedColumnName: 'page_type_id' })
  @ApiProperty()
  page_type: PageType

  @Column({ type: 'varchar', array: true })
  @ApiProperty()
  page_keys: string[]

  @Column()
  @ApiProperty()
  page_name: string

  @Column()
  @ApiProperty()
  page_image: string

  @Column({ type: 'text' })
  @ApiProperty()
  page_content: string

  @Column()
  @ApiProperty()
  language_code: string

  @ManyToOne(() => Language, (lang) => lang.language_code)
  @JoinColumn({ name: 'language_code', referencedColumnName: 'language_code' })
  @ApiProperty()
  language: Language
}
