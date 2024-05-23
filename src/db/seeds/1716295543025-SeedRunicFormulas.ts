import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedRunicFormulas1716295543025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['work'],
        result_name: JSON.stringify({
          ru: 'Формула для удачи в работе и бизнесе',
          en: 'Формула для удачи в работе и бизнесе',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/work.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['career'],
        result_name: JSON.stringify({
          ru: 'Формула для карьерного роста',
          en: 'Формула для карьерного роста',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/career.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['working-capacity'],
        result_name: JSON.stringify({
          ru: 'Формула для усиления работоспособности',
          en: 'Формула для усиления работоспособности',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/working-capacity.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['negotiations'],
        result_name: JSON.stringify({
          ru: 'Формула для удачных переговоров',
          en: 'Формула для удачных переговоров',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/negotiations.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['business-clients'],
        result_name: JSON.stringify({
          ru: 'Поток клиентов для бизнеса',
          en: 'Поток клиентов для бизнеса',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/business-clients.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['energetic-businessmen'],
        result_name: JSON.stringify({
          ru: 'Формула для энергичных бизнесменов',
          en: 'Формула для энергичных бизнесменов',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/energetic-businessmen.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['business-products'],
        result_name: JSON.stringify({
          ru: 'Реализация товаров и услуг в бизнесе',
          en: 'Реализация товаров и услуг в бизнесе',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/business-products.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['creative'],
        result_name: JSON.stringify({ ru: 'Творческая реализация', en: 'Творческая реализация' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/creative.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['wealth'],
        result_name: JSON.stringify({ ru: 'Творческая реализация', en: 'Творческая реализация' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/wealth.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['money'],
        result_name: JSON.stringify({ ru: 'Денежная формула', en: 'Денежная формула' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/money.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['material-well-being'],
        result_name: JSON.stringify({
          ru: 'Формула для роста материального благосостояния',
          en: 'Формула для роста материального благосостояния',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/material-well-being.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['money-attraction'],
        result_name: JSON.stringify({
          ru: 'Формула притягивания денег в вашу жизнь',
          en: 'Формула притягивания денег в вашу жизнь',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/money-attraction.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['money-protection'],
        result_name: JSON.stringify({
          ru: 'Защитная формула накопленных денег',
          en: 'Защитная формула накопленных денег',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/money-protection.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['lucky'],
        result_name: JSON.stringify({ ru: 'Формула удачи', en: 'Формула удачи' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/lucky.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['money-energy'],
        result_name: JSON.stringify({
          ru: 'Подключение к энергии денег',
          en: 'Подключение к энергии денег',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/money-energy.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['unexpected-money'],
        result_name: JSON.stringify({
          ru: 'Формула для получения неожиданных денег',
          en: 'Формула для получения неожиданных денег',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/unexpected-money.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['finance-clear'],
        result_name: JSON.stringify({
          ru: 'Чистка финансовых потоков',
          en: 'Чистка финансовых потоков',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/finance-clear.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['overcomming-crisis'],
        result_name: JSON.stringify({
          ru: 'Формула для перодоления кризисного периода',
          en: 'Формула для перодоления кризисного периода',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/overcomming-crisis.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['material-wealth'],
        result_name: JSON.stringify({
          ru: 'Формула материального достатка',
          en: 'Формула материального достатка',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/material-wealth.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['create-family'],
        result_name: JSON.stringify({
          ru: 'Формула для создания семьи',
          en: 'Формула для создания семьи',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/create-family.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['relation-harmony'],
        result_name: JSON.stringify({
          ru: 'Формула для гармонизации любых отношений',
          en: 'Формула для гармонизации любых отношений',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/relation-harmony.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['partner-find'],
        result_name: JSON.stringify({
          ru: 'Формула для поиска партнера',
          en: 'Формула для поиска партнера',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/partner-find.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['relation-protection'],
        result_name: JSON.stringify({
          ru: 'Защитная формула для отношений',
          en: 'Защитная формула для отношений',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/relation-protection.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['lukcy-in-relations'],
        result_name: JSON.stringify({
          ru: 'Удача в отношениях и любви',
          en: 'Удача в отношениях и любви',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/lukcy-in-relation.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['serious-relations'],
        result_name: JSON.stringify({
          ru: 'Формула для привлечения партнера для создания серьезных отношений',
          en: 'Формула для привлечения партнера для создания серьезных отношений',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/serious-relations.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['crisis-relations'],
        result_name: JSON.stringify({
          ru: 'Вывод отношений из кризиса',
          en: 'Вывод отношений из кризиса',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/crisis-relations.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['people-communication'],
        result_name: JSON.stringify({
          ru: 'Формула для общения с людьми',
          en: 'Формула для общения с людьми',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/people-communication.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['house-protection'],
        result_name: JSON.stringify({
          ru: 'Формула для защиты дома от недоброжелателей',
          en: 'Формула для защиты дома от недоброжелателей',
        }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/house-protection.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['regeneration'],
        result_name: JSON.stringify({ ru: 'Восстановление', en: 'Восстановление' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/regeneration.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['depression'],
        result_name: JSON.stringify({ ru: 'Боремся с депрессией', en: 'Боремся с депрессией' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/depression.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['clear-organizm'],
        result_name: JSON.stringify({ ru: 'Чистый организм', en: 'Чистый организм' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/clear-organizm.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['excess-weight'],
        result_name: JSON.stringify({ ru: 'Убираем лишний вес', en: 'Убираем лишний вес' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/excess-weight.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['life-force'],
        result_name: JSON.stringify({ ru: 'Жизненная сила', en: 'Жизненная сила' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/life-force.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['psyhic'],
        result_name: JSON.stringify({ ru: 'Устойчивая психика', en: 'Устойчивая психика' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/psyhic.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['negative-clear'],
        result_name: JSON.stringify({ ru: 'Чистка от негатива', en: 'Чистка от негатива' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/negative-clear.jpg',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['healing'],
        result_name: JSON.stringify({ ru: 'Исцеление организма', en: 'Исцеление организма' }),
        result_content: JSON.stringify({ ru: '', en: '' }),
        result_image: '/files/uploads?path=uploads/images/runic-formulas/healing.jpg',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, {
      formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
      language_code: 'ru',
    })
  }
}
