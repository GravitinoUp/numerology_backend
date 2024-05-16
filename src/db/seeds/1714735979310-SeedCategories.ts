import { Category } from 'src/modules/category/entities/category.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedCategories1714735979310 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Category, [
      {
        category_id: 1,
        category_name: JSON.stringify({ ru: 'Программа судьбы', en: 'The destiny program' }),
        category_description: JSON.stringify({ ru: '', en: '' }),
        category_image: `/files/uploads?path=uploads/images/categories/destiny.jpg`,
      },
      {
        category_id: 2,
        category_name: JSON.stringify({ ru: 'Карма. Прошлая жизнь', en: 'Karma. Past life' }),
        category_description: JSON.stringify({ ru: '', en: '' }),
        category_image: `/files/uploads?path=uploads/images/categories/karma.jpg`,
      },
      {
        category_id: 3,
        category_name: JSON.stringify({ ru: 'Здоровье', en: 'Health' }),
        category_description: JSON.stringify({ ru: '', en: '' }),
        category_image: `/files/uploads?path=uploads/images/categories/health.jpg`,
      },
      {
        category_id: 4,
        category_name: JSON.stringify({ ru: 'Прогноз', en: 'Prediction' }),
        category_description: JSON.stringify({ ru: '', en: '' }),
        category_image: `/files/uploads?path=uploads/images/categories/graphics.jpg`,
      },
      {
        category_id: 5,
        category_name: JSON.stringify({
          ru: 'Нумерологические расчеты',
          en: 'Numerological calculations',
        }),
        category_description: JSON.stringify({ ru: '', en: '' }),
        category_image: `/files/uploads?path=uploads/images/categories/numerology.jpg`,
      },
      {
        category_id: 6,
        category_name: JSON.stringify({
          ru: 'Стиль по дате рождения',
          en: 'Style by date of birth',
        }),
        category_description: JSON.stringify({ ru: '', en: '' }),
        category_image: `/files/uploads?path=uploads/images/categories/style.jpg`,
      },
      {
        category_id: 7,
        category_name: JSON.stringify({
          ru: 'Совместимость',
          en: 'Compatibility',
        }),
        category_description: JSON.stringify({ ru: '', en: '' }),
        category_image: `/files/uploads?path=uploads/images/categories/relations.jpg`,
      },
      {
        category_id: 8,
        category_name: JSON.stringify({
          ru: 'Цветограмма',
          en: 'Color chart',
        }),
        category_description: JSON.stringify({ ru: '', en: '' }),
        category_image: `/files/uploads?path=uploads/images/categories/colorgramm.jpg`,
      },
      {
        category_id: 9,
        category_name: JSON.stringify({
          ru: 'Полезная нумерология',
          en: 'Useful numerology',
        }),
        category_description: JSON.stringify({ ru: '', en: '' }),
        category_image: `/files/uploads?path=uploads/images/categories/usefull-numerology.jpg`,
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('Categories')
  }
}
