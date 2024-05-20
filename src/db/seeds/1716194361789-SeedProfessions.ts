import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedProfessions1716194361789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //ПРОФЕССИИ
    for (let index = 1; index <= 22; index++) {
      await queryRunner.manager.insert(FormulaResult, [
        {
          formula_type_id: FormulaTypesEnum.PROFESSIONS,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'ru',
        },
        {
          formula_type_id: FormulaTypesEnum.PROFESSIONS,
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
      page_type_id: FormulaTypesEnum.PROFESSIONS,
    })
  }
}
