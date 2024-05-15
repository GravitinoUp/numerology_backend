import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPlanets1715074069836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['1'],
        result_name: 'Солнце',
        result_content: 'Лидерство, авторитет, эго',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['2'],
        result_name: 'Луна',
        result_content: 'Эмоциональность, чувствительность, интуиция',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['3'],
        result_name: 'Юпитер',
        result_content: 'Оптимизм, социальность, удача',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['4'],
        result_name: 'Уран',
        result_content: 'Инновации, оригинальность, нестандартные подходы',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['5'],
        result_name: 'Меркурий',
        result_content: 'Коммуникабельность, адаптивность, интеллект',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['6'],
        result_name: 'Венера',
        result_content: 'Гармония, любовь, красота',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['7'],
        result_name: 'Нептун',
        result_content: 'Духовность, тайны, интуитивные способности',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['8'],
        result_name: 'Сатурн',
        result_content: 'Ответственность, трудолюбие, материальные достижения',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['9'],
        result_name: 'Марс',
        result_content: 'Энергия, страсть, агрессия',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['1'],
        result_name: 'The Sun',
        result_content: 'Leadership, authority, ego',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['2'],
        result_name: 'Moon',
        result_content: 'Emotionality, sensitivity, intuition',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['3'],
        result_name: 'Jupiter',
        result_content: 'Optimism, sociality, luck',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['4'],
        result_name: 'Uranus',
        result_content: 'Innovation, originality, non-standard approaches',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['5'],
        result_name: 'Mercury',
        result_content: 'Sociability, adaptability, intelligence',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['6'],
        result_name: 'Venus',
        result_content: 'Harmony, love, beauty',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['7'],
        result_name: 'Neptune',
        result_content: 'Spirituality, Mysteries, intuitive abilities',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['8'],
        result_name: 'Saturn',
        result_content: 'Responsibility, hard work, material achievements',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['9'],
        result_name: 'Mars',
        result_content: 'Energy, passion, aggression',
        language_code: 'en',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, { page_type_id: FormulaTypesEnum.PLANETS })
  }
}
