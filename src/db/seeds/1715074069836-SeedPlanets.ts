import { PageTypesEnum } from 'src/common/constants/constants'
import { Page } from 'src/modules/page/entities/page.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPlanets1715074069836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Page, [
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['1'],
        page_name: 'Солнце',
        page_image: '',
        page_content: 'Лидерство, авторитет, эго',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['2'],
        page_name: 'Луна',
        page_image: '',
        page_content: 'Эмоциональность, чувствительность, интуиция',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['3'],
        page_name: 'Юпитер',
        page_image: '',
        page_content: 'Оптимизм, социальность, удача',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['4'],
        page_name: 'Уран',
        page_image: '',
        page_content: 'Инновации, оригинальность, нестандартные подходы',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['5'],
        page_name: 'Меркурий',
        page_image: '',
        page_content: 'Коммуникабельность, адаптивность, интеллект',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['6'],
        page_name: 'Венера',
        page_image: '',
        page_content: 'Гармония, любовь, красота',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['7'],
        page_name: 'Нептун',
        page_image: '',
        page_content: 'Духовность, тайны, интуитивные способности',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['8'],
        page_name: 'Сатурн',
        page_image: '',
        page_content: 'Ответственность, трудолюбие, материальные достижения',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['9'],
        page_name: 'Марс',
        page_image: '',
        page_content: 'Энергия, страсть, агрессия',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['1'],
        page_name: 'The Sun',
        page_image: '',
        page_content: 'Leadership, authority, ego',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['2'],
        page_name: 'Moon',
        page_image: '',
        page_content: 'Emotionality, sensitivity, intuition',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['3'],
        page_name: 'Jupiter',
        page_image: '',
        page_content: 'Optimism, sociality, luck',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['4'],
        page_name: 'Uranus',
        page_image: '',
        page_content: 'Innovation, originality, non-standard approaches',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['5'],
        page_name: 'Mercury',
        page_image: '',
        page_content: 'Sociability, adaptability, intelligence',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['6'],
        page_name: 'Venus',
        page_image: '',
        page_content: 'Harmony, love, beauty',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['7'],
        page_name: 'Neptune',
        page_image: '',
        page_content: 'Spirituality, Mysteries, intuitive abilities',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['8'],
        page_name: 'Saturn',
        page_image: '',
        page_content: 'Responsibility, hard work, material achievements',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_keys: ['9'],
        page_name: 'Mars',
        page_image: '',
        page_content: 'Energy, passion, aggression',
        language_code: 'en',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Page, { page_type_id: PageTypesEnum.PLANETS })
  }
}
