import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPairs1717572699306 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 1; i <= 22; i++) {
      for (let ii = 1; ii <= 22; ii++) {
        const key = `${i}+${ii}`
        await queryRunner.manager.insert(FormulaResult, [
          {
            formula_type_id: FormulaTypesEnum.ARCANE_COMPATIBILITY,
            result_keys: [key],
            result_name: JSON.stringify({ ru: key, en: key }),
            result_content: JSON.stringify({ ru: '', en: '' }),
          },
        ])
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, {
      formula_type_id: FormulaTypesEnum.ARCANE_COMPATIBILITY,
    })
  }
}
