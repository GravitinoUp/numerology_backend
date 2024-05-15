import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedHealthNumerology1715764391182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //ЧИСЛО СУДЬБЫ И ПСИХОСОМАТИКА
    for (let index = 1; index <= 9; index++) {
      await queryRunner.manager.insert(FormulaResult, [
        {
          formula_type_id: FormulaTypesEnum.NUMBER_OF_FATE,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'ru',
        },
        {
          formula_type_id: FormulaTypesEnum.NUMBER_OF_FATE,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'en',
        },
      ])
    }

    //ХРОНИЧЕСКИЕ ЗАБОЛЕВАНИЯ
    for (let index = 1; index <= 22; index++) {
      await queryRunner.manager.insert(FormulaResult, [
        {
          formula_type_id: FormulaTypesEnum.CHRONIC_DISEASES,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'ru',
        },
        {
          formula_type_id: FormulaTypesEnum.CHRONIC_DISEASES,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'en',
        },
      ])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, {
      page_type_id: [FormulaTypesEnum.NUMBER_OF_FATE, FormulaTypesEnum.CHRONIC_DISEASES],
    })
  }
}
