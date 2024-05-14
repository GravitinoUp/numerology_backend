import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Language } from 'src/modules/language/entities/language.entity'
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm'

@Entity({ name: 'Onboards' })
export class Onboard extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  onboard_id: number

  @Column()
  @ApiProperty()
  onboard_name: string

  @Column()
  @ApiProperty()
  onboard_image: string

  @Column({ type: 'text' })
  @ApiProperty()
  onboard_description: string

  @Column()
  @ApiProperty()
  language_code: string

  @ManyToOne(() => Language, (lang) => lang.language_code)
  @JoinColumn({ name: 'language_code', referencedColumnName: 'language_code' })
  @ApiProperty()
  language: Language
}
