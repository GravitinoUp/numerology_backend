import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { FormulaType } from 'src/modules/formula-type/entities/formula-type.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedGraphResults1717766197452 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaType, [
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        formula_type_name: JSON.stringify({ ru: 'Графики', en: 'Графики' }),
        formula_type_key: 'graphs',
      },
    ])

    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['volition > destiny'],
        result_name: JSON.stringify({ ru: 'volition > destiny', en: 'volition > destiny' }),
        result_content: JSON.stringify({
          ru: 'volition > destiny',
          en: 'volition > destiny',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['destiny > volition'],
        result_name: JSON.stringify({ ru: 'destiny > volition', en: 'destiny > volition' }),
        result_content: JSON.stringify({
          ru: 'destiny > volition',
          en: 'destiny > volition',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['cross'],
        result_name: JSON.stringify({ ru: 'cross', en: 'cross' }),
        result_content: JSON.stringify({
          ru: 'cross',
          en: 'cross',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['destiny-zero'],
        result_name: JSON.stringify({ ru: 'destiny-zero', en: 'destiny-zero' }),
        result_content: JSON.stringify({
          ru: 'destiny-zero',
          en: 'destiny-zero',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['volition-zero'],
        result_name: JSON.stringify({ ru: 'volition-zero', en: 'volition-zero' }),
        result_content: JSON.stringify({
          ru: 'volition-zero',
          en: 'volition-zero',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['destiny-ascending-lines'],
        result_name: JSON.stringify({ ru: 'destiny-ascending-lines', en: 'destiny-ascending-lines' }),
        result_content: JSON.stringify({
          ru: 'destiny-ascending-lines',
          en: 'destiny-ascending-lines',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['destiny-descending-lines'],
        result_name: JSON.stringify({ ru: 'destiny-descending-lines', en: 'destiny-descending-lines' }),
        result_content: JSON.stringify({
          ru: 'destiny-descending-lines',
          en: 'destiny-descending-lines',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['volition-ascending-lines'],
        result_name: JSON.stringify({ ru: 'volition-ascending-lines', en: 'volition-ascending-lines' }),
        result_content: JSON.stringify({
          ru: 'volition-ascending-lines',
          en: 'volition-ascending-lines',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['volition-descending-lines'],
        result_name: JSON.stringify({ ru: 'volition-descending-lines', en: 'volition-descending-lines' }),
        result_content: JSON.stringify({
          ru: 'volition-descending-lines',
          en: 'volition-descending-lines',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['highest-point'],
        result_name: JSON.stringify({ ru: 'highest-point', en: 'highest-point' }),
        result_content: JSON.stringify({
          ru: 'highest-point',
          en: 'highest-point',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['destiny-comfort-cross'],
        result_name: JSON.stringify({ ru: 'destiny-comfort-cross', en: 'destiny-comfort-cross' }),
        result_content: JSON.stringify({
          ru: 'destiny-comfort-cross',
          en: 'destiny-comfort-cross',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['volition-comfort-cross'],
        result_name: JSON.stringify({ ru: 'volition-comfort-cross', en: 'volition-comfort-cross' }),
        result_content: JSON.stringify({
          ru: 'volition-comfort-cross',
          en: 'volition-comfort-cross',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GRAPHS,
        result_keys: ['both-comfort-cross'],
        result_name: JSON.stringify({ ru: 'both-comfort-cross', en: 'both-comfort-cross' }),
        result_content: JSON.stringify({
          ru: 'both-comfort-cross',
          en: 'both-comfort-cross',
        }),
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaType, {
      formula_type_id: FormulaTypesEnum.GRAPHS,
    })

    await queryRunner.manager.delete(FormulaResult, {
      formula_type_id: FormulaTypesEnum.GRAPHS,
    })
  }
}
