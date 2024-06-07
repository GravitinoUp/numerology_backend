import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaType } from 'src/modules/formula-type/entities/formula-type.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateCausesDiseases1717739075865 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .getRepository(FormulaType)
      .createQueryBuilder()
      .update()
      .where({ formula_type_id: FormulaTypesEnum.METAPHYSICAL_CAUSES_OF_DISEASES })
      .set({
        formula_type_key: 'health',
      })
      .execute()
  }

  public async down(): Promise<void> {}
}
