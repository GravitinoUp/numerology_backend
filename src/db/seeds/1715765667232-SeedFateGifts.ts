import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedFateGifts1715765667232 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //ПОДАРИ ПО ЧИСЛУ СУДЬБЫ
    for (let index = 1; index <= 9; index++) {
      await queryRunner.manager.insert(FormulaResult, [
        {
          formula_type_id: FormulaTypesEnum.FATE_NUMBER_GIFTS,
          result_keys: [index.toString()],
          result_name: JSON.stringify({ ru: index.toString(), en: index.toString() }),
          result_content: JSON.stringify({ ru: '', en: '' }),
        },
      ])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, {
      formula_type_id: FormulaTypesEnum.FATE_NUMBER_GIFTS,
    })
  }
}
