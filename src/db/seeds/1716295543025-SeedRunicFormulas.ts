import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedRunicFormulas1716295543025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['work'],
        result_name: 'Формула для удачи в работе и бизнесе',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/work.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['career'],
        result_name: 'Формула для карьерного роста',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/career.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['working-capacity'],
        result_name: 'Формула для усиления работоспособности',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/working-capacity.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['negotiations'],
        result_name: 'Формула для удачных переговоров',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/negotiations.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['business-clients'],
        result_name: 'Поток клиентов для бизнеса',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/business-clients.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['energetic-businessmen'],
        result_name: 'Формула для энергичных бизнесменов',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/energetic-businessmen.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['business-products'],
        result_name: 'Реализация товаров и услуг в бизнесе',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/business-products.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['creative'],
        result_name: 'Творческая реализация',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/creative.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['wealth'],
        result_name: 'Формула богатства',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/wealth.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['money'],
        result_name: 'Денежная формула',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/money.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['material-well-being'],
        result_name: 'Формула для роста материального благосостояния',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/material-well-being.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['money-attraction'],
        result_name: 'Формула притягивания денег в вашу жизнь',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/money-attraction.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['money-protection'],
        result_name: 'Защитная формула накопленных денег',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/money-protection.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['lucky'],
        result_name: 'Формула удачи',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/lucky.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['money-energy'],
        result_name: 'Подключение к энергии денег',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/money-energy.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['unexpected-money'],
        result_name: 'Формула для получения неожиданных денег',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/unexpected-money.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['finance-clear'],
        result_name: 'Чистка финансовых потоков',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/finance-clear.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['overcomming-crisis'],
        result_name: 'Формула для перодоления кризисного периода',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/overcomming-crisis.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['material-wealth'],
        result_name: 'Формула материального достатка',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/material-wealth.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['create-family'],
        result_name: 'Формула для создания семьи',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/create-family.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['relation-harmony'],
        result_name: 'Формула для гармонизации любых отношений',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/relation-harmony.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['partner-find'],
        result_name: 'Формула для поиска партнера',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/partner-find.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['relation-protection'],
        result_name: 'Защитная формула для отношений',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/relation-protection.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['lukcy-in-relations'],
        result_name: 'Удача в отношениях и любви',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/lukcy-in-relation.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['serious-relations'],
        result_name: 'Формула для привлечения партнера для создания серьезных отношений',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/serious-relations.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['crisis-relations'],
        result_name: 'Вывод отношений из кризиса',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/crisis-relations.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['people-communication'],
        result_name: 'Формула для общения с людьми',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/people-communication.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['house-protection'],
        result_name: 'Формула для защиты дома от недоброжелателей',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/house-protection.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['regeneration'],
        result_name: 'Восстановление',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/regeneration.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['depression'],
        result_name: 'Боремся с депрессией',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/depression.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['clear-organizm'],
        result_name: 'Чистый организм',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/clear-organizm.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['excess-weight'],
        result_name: 'Убираем лишний вес',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/excess-weight.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['life-force'],
        result_name: 'Жизненная сила',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/life-force.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['psyhic'],
        result_name: 'Устойчивая психика',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/psyhic.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['negative-clear'],
        result_name: 'Чистка от негатива',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/negative-clear.jpg',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.RUNIC_FORMULAS,
        result_keys: ['healing'],
        result_name: 'Исцеление организма',
        result_content: '',
        result_image: '/files/uploads?path=uploads/images/runic-formulas/healing.jpg',
        language_code: 'ru',
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
