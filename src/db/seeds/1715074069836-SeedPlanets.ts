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
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-sun.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['2'],
        result_name: 'Луна',
        result_content: 'Эмоциональность, чувствительность, интуиция',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-moon.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['3'],
        result_name: 'Юпитер',
        result_content: 'Оптимизм, социальность, удача',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-jupiter.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['4'],
        result_name: 'Уран',
        result_content: 'Инновации, оригинальность, нестандартные подходы',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-uranus.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['5'],
        result_name: 'Меркурий',
        result_content: 'Коммуникабельность, адаптивность, интеллект',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-mercury.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['6'],
        result_name: 'Венера',
        result_content: 'Гармония, любовь, красота',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-venus.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['7'],
        result_name: 'Нептун',
        result_content: 'Духовность, тайны, интуитивные способности',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-neptun.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['8'],
        result_name: 'Сатурн',
        result_content: 'Ответственность, трудолюбие, материальные достижения',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-saturn.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['9'],
        result_name: 'Марс',
        result_content: 'Энергия, страсть, агрессия',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-mars.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['1'],
        result_name: 'The Sun',
        result_content: 'Leadership, authority, ego',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-sun.jpg',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['2'],
        result_name: 'Moon',
        result_content: 'Emotionality, sensitivity, intuition',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-moon.jpg',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['3'],
        result_name: 'Jupiter',
        result_content: 'Optimism, sociality, luck',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-jupiter.jpg',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['4'],
        result_name: 'Uranus',
        result_content: 'Innovation, originality, non-standard approaches',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-uranus.jpg',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['5'],
        result_name: 'Mercury',
        result_content: 'Sociability, adaptability, intelligence',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-mercury.jpg',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['6'],
        result_name: 'Venus',
        result_content: 'Harmony, love, beauty',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-venus.jpg',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['7'],
        result_name: 'Neptune',
        result_content: 'Spirituality, Mysteries, intuitive abilities',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-neptun.jpg',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['8'],
        result_name: 'Saturn',
        result_content: 'Responsibility, hard work, material achievements',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-saturn.jpg',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        result_keys: ['9'],
        result_name: 'Mars',
        result_content: 'Energy, passion, aggression',
        result_image: '/files/uploads?path=uploads/images/planets/image-bg-mars.jpg',
        language_code: 'en',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, { page_type_id: FormulaTypesEnum.PLANETS })
  }
}
