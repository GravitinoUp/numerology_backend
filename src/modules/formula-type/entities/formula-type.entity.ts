import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity({ name: 'FormulaTypes' })
export class FormulaType extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  formula_type_id: number

  @Column({ type: 'json' })
  @ApiProperty()
  formula_type_name: string

  @Column({ type: 'json', default: { ru: '', en: '' } })
  @ApiProperty()
  formula_type_description: string

  @Column()
  @ApiProperty()
  formula_type_key: string

  @OneToMany(() => FormulaResult, (page) => page.formula_type, { cascade: true, eager: true })
  pages: FormulaResult[]
}
