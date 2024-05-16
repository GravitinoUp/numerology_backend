import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { Onboard } from 'src/modules/onboard/entities/onboard.entity'
import { Page } from 'src/modules/page/entities/page.entity'
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

  @OneToMany(() => FormulaResult, (result) => result.language, { cascade: true, eager: true })
  formula_results: FormulaResult[]

  @OneToMany(() => Page, (page) => page.language, { cascade: true, eager: true })
  pages: Page[]
}
