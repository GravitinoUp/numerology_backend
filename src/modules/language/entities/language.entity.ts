import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Onboard } from 'src/modules/onboard/entities/onboard.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'Languages' })
export class Language extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  language_code: string

  @Column()
  @ApiProperty()
  language_name: string

  @OneToMany(() => Onboard, (onboard) => onboard.language, { cascade: true, eager: true })
  onboards: Onboard[]
}
