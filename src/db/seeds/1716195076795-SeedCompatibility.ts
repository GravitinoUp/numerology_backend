import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedCompatibility1716195076795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //АРКАННАЯ СОВМЕСТИМОСТЬ
    for (let index = 1; index <= 22; index++) {
      await queryRunner.manager.insert(FormulaResult, [
        {
          formula_type_id: FormulaTypesEnum.ARCANE_COMPATIBILITY,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'ru',
        },
        {
          formula_type_id: FormulaTypesEnum.ARCANE_COMPATIBILITY,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'en',
        },
      ])
    }

    //СОВМЕСТИМОСТЬ ПО ЧИСЛУ СУДЬБЫ
    for (let index = 1; index <= 9; index++) {
      await queryRunner.manager.insert(FormulaResult, [
        {
          formula_type_id: FormulaTypesEnum.SOUL_NUMBER_COMPATIBILITY,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'ru',
        },
        {
          formula_type_id: FormulaTypesEnum.SOUL_NUMBER_COMPATIBILITY,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'en',
        },
      ])
    }

    //СОВМЕСТНЫЕ ЗАДАЧИ В ПАРЕ
    for (let index = 1; index <= 22; index++) {
      await queryRunner.manager.insert(FormulaResult, [
        {
          formula_type_id: FormulaTypesEnum.JOINT_TASKS_COMPATIBILITY,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'ru',
        },
        {
          formula_type_id: FormulaTypesEnum.JOINT_TASKS_COMPATIBILITY,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'en',
        },
      ])
    }

    //ВОЗМОЖНЫЕ ТРУДНОСТИ В ПАРЕ
    for (let index = 1; index <= 22; index++) {
      await queryRunner.manager.insert(FormulaResult, [
        {
          formula_type_id: FormulaTypesEnum.DIFFICULTIES_COMPATIBILITY,
          result_keys: [index.toString()],
          result_name: index.toString(),
          result_content: '',
          language_code: 'ru',
        },
        {
          formula_type_id: FormulaTypesEnum.DIFFICULTIES_COMPATIBILITY,
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
      formula_type_id: [
        FormulaTypesEnum.ARCANE_COMPATIBILITY,
        FormulaTypesEnum.SOUL_NUMBER_COMPATIBILITY,
        FormulaTypesEnum.JOINT_TASKS_COMPATIBILITY,
        FormulaTypesEnum.DIFFICULTIES_COMPATIBILITY,
      ],
    })
  }
}
