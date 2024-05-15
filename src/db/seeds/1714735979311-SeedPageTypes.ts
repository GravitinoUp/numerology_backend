import { PageTypesEnum } from 'src/common/constants/constants'
import { PageType } from 'src/modules/page_type/entities/page_type.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPageTypes1714735979311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(PageType, [
      {
        page_type_id: PageTypesEnum.HEALTH,
        page_type_name: JSON.stringify({ ru: 'Нумерология здоровья', en: 'Numerology of health' }),
        category_id: 3,
      },
      {
        page_type_id: PageTypesEnum.FATE_CARDS,
        page_type_name: JSON.stringify({ ru: 'Карты судьбы', en: 'Cards of Fate' }),
        category_id: 1,
      },
      {
        page_type_id: PageTypesEnum.LUCKY_NUMBERS,
        page_type_name: JSON.stringify({ ru: 'Числа удачи', en: 'Luck numbers' }),
        category_id: 9,
      },
      {
        page_type_id: PageTypesEnum.PLANETS,
        page_type_name: JSON.stringify({ ru: 'Планеты', en: 'Planets' }),
        category_id: 1,
      },
      {
        page_type_id: PageTypesEnum.PROFESSIONS,
        page_type_name: JSON.stringify({
          ru: 'Профессии и самореализация',
          en: 'Professions and self-realization',
        }),
        category_id: 9,
      },
      {
        page_type_id: PageTypesEnum.WEAK_TRAITS,
        page_type_name: JSON.stringify({
          ru: 'Слабые качества',
          en: 'Weak qualities',
        }),
        category_id: 1,
      },
      {
        page_type_id: PageTypesEnum.ANCESTORS,
        page_type_name: JSON.stringify({
          ru: 'Кем были ваши предки',
          en: 'Who were your ancestors',
        }),
        category_id: 9,
      },
      {
        page_type_id: PageTypesEnum.NUMBER_OF_FATE,
        page_type_name: JSON.stringify({
          ru: 'Число судьбы и психосоматика',
          en: 'The number of fate and psychosomatics',
        }),
        category_id: 3,
      },
      {
        page_type_id: PageTypesEnum.CHRONIC_DISEASES,
        page_type_name: JSON.stringify({
          ru: 'Хронические заболевания',
          en: 'Chronic diseases',
        }),
        category_id: 3,
      },
      {
        page_type_id: PageTypesEnum.METAPHYSICAL_CAUSES_OF_DISEASES,
        page_type_name: JSON.stringify({
          ru: 'Метафизические причины болезней',
          en: 'Metaphysical causes of diseases',
        }),
        category_id: 3,
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_type_name: JSON.stringify({
          ru: 'Тотемное животное',
          en: 'Totemic animal',
        }),
        category_id: 9,
      },
      {
        page_type_id: PageTypesEnum.TASKS,
        page_type_name: JSON.stringify({
          ru: 'Задачи для реализации',
          en: 'Tasks for implementation',
        }),
        category_id: 1,
      },
      {
        page_type_id: PageTypesEnum.SECRET_OF_NAME,
        page_type_name: JSON.stringify({
          ru: 'Тайна имени',
          en: 'The secret of the name',
        }),
        category_id: 1,
      },
      {
        page_type_id: PageTypesEnum.EXPRESSION_NUMBER,
        page_type_name: JSON.stringify({
          ru: 'Число выражения',
          en: 'Число выражения',
        }),
        category_id: 1,
      },
      {
        page_type_id: PageTypesEnum.LIFE_PATH_NUMBER,
        page_type_name: JSON.stringify({
          ru: 'Число жизненного пути',
          en: 'The number of the life path',
        }),
        category_id: 1,
      },
      {
        page_type_id: PageTypesEnum.KARMA,
        page_type_name: JSON.stringify({
          ru: 'Карма и прошлая жизнь',
          en: 'Karma and past life',
        }),
        category_id: 2,
      },
      {
        page_type_id: PageTypesEnum.STRONG_TRAITS,
        page_type_name: JSON.stringify({
          ru: 'Сильные качества и таланты',
          en: 'Strong qualities and talents',
        }),
        category_id: 1,
      },
      {
        page_type_id: PageTypesEnum.BLOOD_TYPE,
        page_type_name: JSON.stringify({
          ru: 'Группа крови и нумерология',
          en: 'Blood type and numerology',
        }),
        category_id: 3,
      },
      {
        page_type_id: PageTypesEnum.ANGELIC_NUMEROLOGY,
        page_type_name: JSON.stringify({
          ru: 'Ангельская нумерология',
          en: 'Angelic numerology',
        }),
        category_id: 3,
      },
      {
        page_type_id: PageTypesEnum.GUESSING_NUMBER,
        page_type_name: JSON.stringify({
          ru: 'Гадание по числам',
          en: 'Gussing by numbers',
        }),
        category_id: 3,
      },
      {
        page_type_id: PageTypesEnum.ARCANE_COMPATIBILITY,
        page_type_name: JSON.stringify({
          ru: 'Арканная совместимость',
          en: 'Arcane compatibility',
        }),
        category_id: 7,
      },
      {
        page_type_id: PageTypesEnum.SOUL_NUMBER_COMPATIBILITY,
        page_type_name: JSON.stringify({
          ru: 'Совместимость по числу судьбы',
          en: 'Compatibility by the number of fate',
        }),
        category_id: 7,
      },
      {
        page_type_id: PageTypesEnum.JOINT_TASKS_COMPATIBILITY,
        page_type_name: JSON.stringify({
          ru: 'Совместные задачи в паре',
          en: 'Joint tasks in pairs',
        }),
        category_id: 7,
      },
      {
        page_type_id: PageTypesEnum.DIFFICULTIES_COMPATIBILITY,
        page_type_name: JSON.stringify({
          ru: 'Возможные трудности в паре',
          en: 'Possible difficulties in a couple',
        }),
        category_id: 7,
      },
      {
        page_type_id: PageTypesEnum.PERSONAL_YEAR_NUMBER,
        page_type_name: JSON.stringify({
          ru: 'Персональное число года',
          en: 'Personal number of the year',
        }),
        category_id: 5,
      },
      {
        page_type_id: PageTypesEnum.PHONE_NUMBER_CALCULATION,
        page_type_name: JSON.stringify({
          ru: 'Расчет номера телефона',
          en: 'Calculation of the phone number',
        }),
        category_id: 5,
      },
      {
        page_type_id: PageTypesEnum.HOUSE_NUMBER_CALCULATION,
        page_type_name: JSON.stringify({
          ru: 'Расчет номера дома',
          en: 'Calculation of the house number',
        }),
        category_id: 5,
      },
      {
        page_type_id: PageTypesEnum.FATE_NUMBER_GIFTS,
        page_type_name: JSON.stringify({
          ru: 'Подарки по числу судьбы',
          en: 'Gifts according to the number of fate',
        }),
        category_id: 9,
      },
      {
        page_type_id: PageTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        page_type_name: JSON.stringify({
          ru: 'Эфирное масло по числу судьбы',
          en: 'Essential oil by the number of fate',
        }),
        category_id: 3,
      },
      {
        page_type_id: PageTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        page_type_name: JSON.stringify({
          ru: 'Эфирное масло по аркану дня рождения',
          en: 'Essential oil for the arcana of the birthday',
        }),
        category_id: 3,
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('PageTypes')
  }
}
