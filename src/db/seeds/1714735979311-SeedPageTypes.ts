import { PageType } from 'src/modules/page_type/entities/page_type.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPageTypes1714735979311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(PageType, [
      {
        page_type_id: 1,
        page_type_name: JSON.stringify({ ru: 'Нумерология здоровья', en: 'Numerology of health' }),
        category_id: 3,
      },
      {
        page_type_id: 2,
        page_type_name: JSON.stringify({ ru: 'Карты судьбы', en: 'Cards of Fate' }),
        category_id: 1,
      },
      {
        page_type_id: 3,
        page_type_name: JSON.stringify({ ru: 'Числа удачи', en: 'Luck numbers' }),
        category_id: 9,
      },
      {
        page_type_id: 4,
        page_type_name: JSON.stringify({ ru: 'Планеты', en: 'Planets' }),
        category_id: 1,
      },
      {
        page_type_id: 5,
        page_type_name: JSON.stringify({
          ru: 'Профессии и самореализация',
          en: 'Professions and self-realization',
        }),
        category_id: 9,
      },
      {
        page_type_id: 6,
        page_type_name: JSON.stringify({
          ru: 'Слабые качества',
          en: 'Weak qualities',
        }),
        category_id: 1,
      },
      {
        page_type_id: 7,
        page_type_name: JSON.stringify({
          ru: 'Кем были ваши предки',
          en: 'Who were your ancestors',
        }),
        category_id: 9,
      },
      {
        page_type_id: 8,
        page_type_name: JSON.stringify({
          ru: 'Число судьбы и психосоматика',
          en: 'The number of fate and psychosomatics',
        }),
        category_id: 1,
      },
      {
        page_type_id: 9,
        page_type_name: JSON.stringify({
          ru: 'Хронические заболевания',
          en: 'Chronic diseases',
        }),
        category_id: 3,
      },
      {
        page_type_id: 10,
        page_type_name: JSON.stringify({
          ru: 'Метафизические причины болезней',
          en: 'Metaphysical causes of diseases',
        }),
        category_id: 3,
      },
      {
        page_type_id: 11,
        page_type_name: JSON.stringify({
          ru: 'Тотемное животное',
          en: 'Totemic animal',
        }),
        category_id: 9,
      },
      {
        page_type_id: 12,
        page_type_name: JSON.stringify({
          ru: 'Задачи для реализации',
          en: 'Tasks for implementation',
        }),
        category_id: 1,
      },
      {
        page_type_id: 13,
        page_type_name: JSON.stringify({
          ru: 'Тайна имени',
          en: 'The secret of the name',
        }),
        category_id: 1,
      },
      {
        page_type_id: 14,
        page_type_name: JSON.stringify({
          ru: 'Число выражения',
          en: 'Число выражения',
        }),
        category_id: 1,
      },
      {
        page_type_id: 15,
        page_type_name: JSON.stringify({
          ru: 'Число жизненного пути',
          en: 'The number of the life path',
        }),
        category_id: 1,
      },
      {
        page_type_id: 16,
        page_type_name: JSON.stringify({
          ru: 'Карма и прошлая жизнь',
          en: 'Karma and past life',
        }),
        category_id: 2,
      },
      {
        page_type_id: 17,
        page_type_name: JSON.stringify({
          ru: 'Сильные качества и таланты',
          en: 'Strong qualities and talents',
        }),
        category_id: 1,
      },
      {
        page_type_id: 18,
        page_type_name: JSON.stringify({
          ru: 'Группа крови и нумерология',
          en: 'Blood type and numerology',
        }),
        category_id: 3,
      },
      {
        page_type_id: 19,
        page_type_name: JSON.stringify({
          ru: 'Ангельская нумерология',
          en: 'Angelic numerology',
        }),
        category_id: 3,
      },
      {
        page_type_id: 20,
        page_type_name: JSON.stringify({
          ru: 'Гадание по числам',
          en: 'Gussing by numbers',
        }),
        category_id: 3,
      },
      {
        page_type_id: 21,
        page_type_name: JSON.stringify({
          ru: 'Арканная совместимость',
          en: 'Arcane compatibility',
        }),
        category_id: 7,
      },
      {
        page_type_id: 22,
        page_type_name: JSON.stringify({
          ru: 'Совместимость по числу судьбы',
          en: 'Compatibility by the number of fate',
        }),
        category_id: 7,
      },
      {
        page_type_id: 23,
        page_type_name: JSON.stringify({
          ru: 'Совместные задачи в паре',
          en: 'Joint tasks in pairs',
        }),
        category_id: 7,
      },
      {
        page_type_id: 24,
        page_type_name: JSON.stringify({
          ru: 'Возможные трудности в паре',
          en: 'Possible difficulties in a couple',
        }),
        category_id: 7,
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('PageTypes')
  }
}
