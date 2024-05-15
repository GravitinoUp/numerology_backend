import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaType } from 'src/modules/formula_type/entities/formula_type.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedFormulaTypes1714735979311 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaType, [
      {
        formula_type_id: FormulaTypesEnum.HEALTH,
        formula_type_name: JSON.stringify({
          ru: 'Нумерология здоровья',
          en: 'Numerology of health',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.FATE_CARDS,
        formula_type_name: JSON.stringify({ ru: 'Карты судьбы', en: 'Cards of Fate' }),
      },
      {
        formula_type_id: FormulaTypesEnum.LUCKY_NUMBERS,
        formula_type_name: JSON.stringify({ ru: 'Числа удачи', en: 'Luck numbers' }),
      },
      {
        formula_type_id: FormulaTypesEnum.PLANETS,
        formula_type_name: JSON.stringify({ ru: 'Планеты', en: 'Planets' }),
      },
      {
        formula_type_id: FormulaTypesEnum.PROFESSIONS,
        formula_type_name: JSON.stringify({
          ru: 'Профессии и самореализация',
          en: 'Professions and self-realization',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.WEAK_TRAITS,
        formula_type_name: JSON.stringify({
          ru: 'Слабые качества',
          en: 'Weak qualities',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.ANCESTORS,
        formula_type_name: JSON.stringify({
          ru: 'Кем были ваши предки',
          en: 'Who were your ancestors',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.NUMBER_OF_FATE,
        formula_type_name: JSON.stringify({
          ru: 'Число судьбы и психосоматика',
          en: 'The number of fate and psychosomatics',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.CHRONIC_DISEASES,
        formula_type_name: JSON.stringify({
          ru: 'Хронические заболевания',
          en: 'Chronic diseases',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.METAPHYSICAL_CAUSES_OF_DISEASES,
        formula_type_name: JSON.stringify({
          ru: 'Метафизические причины болезней',
          en: 'Metaphysical causes of diseases',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        formula_type_name: JSON.stringify({
          ru: 'Тотемное животное',
          en: 'Totemic animal',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.TASKS,
        formula_type_name: JSON.stringify({
          ru: 'Задачи для реализации',
          en: 'Tasks for implementation',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.SECRET_OF_NAME,
        formula_type_name: JSON.stringify({
          ru: 'Тайна имени',
          en: 'The secret of the name',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.EXPRESSION_NUMBER,
        formula_type_name: JSON.stringify({
          ru: 'Число выражения',
          en: 'Число выражения',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.LIFE_PATH_NUMBER,
        formula_type_name: JSON.stringify({
          ru: 'Число жизненного пути',
          en: 'The number of the life path',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.KARMA,
        formula_type_name: JSON.stringify({
          ru: 'Карма и прошлая жизнь',
          en: 'Karma and past life',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.STRONG_TRAITS,
        formula_type_name: JSON.stringify({
          ru: 'Сильные качества и таланты',
          en: 'Strong qualities and talents',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.BLOOD_TYPE,
        formula_type_name: JSON.stringify({
          ru: 'Группа крови и нумерология',
          en: 'Blood type and numerology',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.ANGELIC_NUMEROLOGY,
        formula_type_name: JSON.stringify({
          ru: 'Ангельская нумерология',
          en: 'Angelic numerology',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.GUESSING_NUMBER,
        formula_type_name: JSON.stringify({
          ru: 'Гадание по числам',
          en: 'Gussing by numbers',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.ARCANE_COMPATIBILITY,
        formula_type_name: JSON.stringify({
          ru: 'Арканная совместимость',
          en: 'Arcane compatibility',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_COMPATIBILITY,
        formula_type_name: JSON.stringify({
          ru: 'Совместимость по числу судьбы',
          en: 'Compatibility by the number of fate',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.JOINT_TASKS_COMPATIBILITY,
        formula_type_name: JSON.stringify({
          ru: 'Совместные задачи в паре',
          en: 'Joint tasks in pairs',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DIFFICULTIES_COMPATIBILITY,
        formula_type_name: JSON.stringify({
          ru: 'Возможные трудности в паре',
          en: 'Possible difficulties in a couple',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.PERSONAL_YEAR_NUMBER,
        formula_type_name: JSON.stringify({
          ru: 'Персональное число года',
          en: 'Personal number of the year',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.PHONE_NUMBER_CALCULATION,
        formula_type_name: JSON.stringify({
          ru: 'Расчет номера телефона',
          en: 'Calculation of the phone number',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.HOUSE_NUMBER_CALCULATION,
        formula_type_name: JSON.stringify({
          ru: 'Расчет номера дома',
          en: 'Calculation of the house number',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.FATE_NUMBER_GIFTS,
        formula_type_name: JSON.stringify({
          ru: 'Подарки по числу судьбы',
          en: 'Gifts according to the number of fate',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        formula_type_name: JSON.stringify({
          ru: 'Эфирное масло по числу судьбы',
          en: 'Essential oil by the number of fate',
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        formula_type_name: JSON.stringify({
          ru: 'Эфирное масло по аркану дня рождения',
          en: 'Essential oil for the arcana of the birthday',
        }),
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('PageTypes')
  }
}
