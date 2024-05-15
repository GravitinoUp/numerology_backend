import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Language } from 'src/modules/language/entities/language.entity'
import { FormulaType } from 'src/modules/formula-type/entities/formula-type.entity'
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

@Entity({ name: 'FormulaResults' })
export class FormulaResult extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  result_uuid: string

  @Column()
  @ApiProperty()
  formula_type_id: number

  @ManyToOne(() => FormulaType, (formulaType) => formulaType.formula_type_id)
  @JoinColumn({ name: 'formula_type_id', referencedColumnName: 'formula_type_id' })
  @ApiProperty()
  formula_type: FormulaType

  @Column({ type: 'varchar', array: true })
  @ApiProperty()
  result_keys: string[]

  @Column()
  @ApiProperty()
  result_name: string

  @Column({ type: 'text' })
  @ApiProperty()
  result_content: string

  @Column()
  @ApiProperty()
  language_code: string

  @ManyToOne(() => Language, (lang) => lang.language_code)
  @JoinColumn({ name: 'language_code', referencedColumnName: 'language_code' })
  @ApiProperty()
  language: Language
}
