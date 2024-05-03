import { PageType } from 'src/modules/page_type/entities/page_type.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPageTypes1714735979311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(PageType, [
      {
        page_type_id: 1,
        page_type_name: JSON.stringify({ ru: 'Нумерология здоровья', en: 'Numerology of health' }),
      },
      {
        page_type_id: 2,
        page_type_name: JSON.stringify({ ru: 'Карты судьбы', en: 'Cards of Fate' }),
      },
      {
        page_type_id: 3,
        page_type_name: JSON.stringify({ ru: 'Числа удачи', en: 'Luck numbers' }),
      },
      {
        page_type_id: 4,
        page_type_name: JSON.stringify({ ru: 'Планеты', en: 'Planets' }),
      },
      {
        page_type_id: 5,
        page_type_name: JSON.stringify({
          ru: 'Профессии и самореализация',
          en: 'Professions and self-realization',
        }),
      },
      {
        page_type_id: 6,
        page_type_name: JSON.stringify({
          ru: 'Слабые качества',
          en: 'Weak qualities',
        }),
      },
      {
        page_type_id: 7,
        page_type_name: JSON.stringify({
          ru: 'Кем были ваши предки',
          en: 'Who were your ancestors',
        }),
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('PageTypes')
  }
}
