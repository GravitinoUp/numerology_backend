import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedAromatherapy1715772019952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['1'],
        result_name: JSON.stringify({ ru: 'Лидерство, инициатива', en: 'Лидерство, инициатива' }),
        result_content: JSON.stringify({
          ru: `- *Масло розмарина* – стимулирует ум и концентрацию, добавляет энергии., en:         - *Масло эвкалипта* – освежает, придаёт силы и помогает сосредоточиться.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['2'],
        result_name: JSON.stringify({ ru: 'Гармония, партнёрство', en: 'Гармония, партнёрство' }),
        result_content: JSON.stringify({
          ru: `- *Масло ромашки* – успокаивает, уменьшает стресс и способствует миру., en:         - *Масло иланг-иланга* – уравновешивает эмоции, способствует релаксации.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['3'],
        result_name: JSON.stringify({
          ru: 'Коммуникация, творчество',
          en: 'Коммуникация, творчество',
        }),
        result_content: JSON.stringify({
          ru: `- *Масло лимона* – стимулирует ум и поднимает настроение., en:         - *Масло грейпфрута* – активизирует и освежает, поднимает дух.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['4'],
        result_name: JSON.stringify({ ru: 'Стабильность, порядок', en: 'Стабильность, порядок' }),
        result_content: JSON.stringify({
          ru: `- *Масло кедра* – создаёт ощущение устойчивости и комфорта., en:         - *Масло ветивера* – помогает укрепить нервную систему, добавляет уверенности.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['5'],
        result_name: JSON.stringify({ ru: 'Приключение, изменения', en: 'Приключение, изменения' }),
        result_content: JSON.stringify({
          ru: `- *Масло перечной мяты* – освежает, стимулирует новые идеи, придаёт энергию., en:         - *Масло имбиря* – добавляет тепла и остроты, стимулирует движение вперёд.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['6'],
        result_name: JSON.stringify({
          ru: 'Забота, ответственность',
          en: 'Забота, ответственность',
        }),
        result_content: JSON.stringify({
          ru: `- *Масло лаванды* – уменьшает анксиозность, способствует спокойствию и заботе., en:         - *Масло розы* – улучшает настроение, помогает в эмоциональном балансе.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['7'],
        result_name: JSON.stringify({ ru: 'Духовность, мудрость', en: 'Духовность, мудрость' }),
        result_content: JSON.stringify({
          ru: `- *Масло франкинсенса* – способствует медитации, углублению мыслей., en:         - *Масло мирры* – поддерживает духовные практики, углубляет медитативные состояния.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['8'],
        result_name: JSON.stringify({ ru: 'Сила, успех', en: 'Сила, успех' }),
        result_content: JSON.stringify({
          ru: `- *Масло сандала* – помогает углубиться в себя, поддерживает при духовных поисках и медитации., en:         - *Масло пачули* – укрепляет энергетический фон, способствует привлечению успеха.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['9'],
        result_name: JSON.stringify({
          ru: 'Гуманитарность, завершение',
          en: 'Гуманитарность, завершение',
        }),
        result_content: JSON.stringify({
          ru: `- *Масло нероли* – снимает напряжение, помогает справиться с горем и утратой., en:         - *Масло жасмина* – улучшает настроение, способствует эмоциональной открытости и сочувствию.`,
        }),
      },
    ])

    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['1'],
        result_name: JSON.stringify({ ru: 'I - Маг', en: 'I - Маг' }),
        result_content: JSON.stringify({
          ru: `Мята — активизация ума и коммуникативных способностей.`,
          en: `Мята — активизация ума и коммуникативных способностей.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['2'],
        result_name: JSON.stringify({ ru: 'II - Верховная Жрица', en: 'II - Верховная Жрица' }),
        result_content: JSON.stringify({
          ru: `Лунная трава — усиление интуиции и мистической мудрости.`,
          en: `Лунная трава — усиление интуиции и мистической мудрости.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['3'],
        result_name: JSON.stringify({ ru: 'III - Императрица', en: 'III - Императрица' }),
        result_content: JSON.stringify({
          ru: `Роза — плодородие, красота и забота.`,
          en: `Роза — плодородие, красота и забота.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['4'],
        result_name: JSON.stringify({ ru: 'IV - Император', en: 'IV - Император' }),
        result_content: JSON.stringify({
          ru: `Кедр — стабильность, сила и защита.`,
          en: `Кедр — стабильность, сила и защита.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['5'],
        result_name: JSON.stringify({ ru: 'V - Иерофант', en: 'V - Иерофант' }),
        result_content: JSON.stringify({
          ru: `Франкинсенс — духовное просвещение и связь с традициями.`,
          en: `Франкинсенс — духовное просвещение и связь с традициями.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['6'],
        result_name: JSON.stringify({ ru: 'VI - Влюбленные', en: 'VI - Влюбленные' }),
        result_content: JSON.stringify({
          ru: `Иланг-иланг — гармония отношений и страстная любовь.`,
          en: `Иланг-иланг — гармония отношений и страстная любовь.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['7'],
        result_name: JSON.stringify({ ru: 'VII - Колесница', en: 'VII - Колесница' }),
        result_content: JSON.stringify({
          ru: `Черный перец — детерминация, смелость и преодоление препятствий.`,
          en: `Черный перец — детерминация, смелость и преодоление препятствий.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['8'],
        result_name: JSON.stringify({ ru: 'VIII - Справедливость', en: 'VIII - Справедливость' }),
        result_content: JSON.stringify({
          ru: `Ладан — ясность, честность и справедливость.`,
          en: `Ладан — ясность, честность и справедливость.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['9'],
        result_name: JSON.stringify({ ru: 'IX - Отшельник', en: 'IX - Отшельник' }),
        result_content: JSON.stringify({
          ru: `Сандал — медитация, внутренний поиск и просветление.`,
          en: `Сандал — медитация, внутренний поиск и просветление.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['10'],
        result_name: JSON.stringify({ ru: 'X - Колесо Фортуны', en: 'X - Колесо Фортуны' }),
        result_content: JSON.stringify({
          ru: `Эвкалипт — изменения, гибкость и адаптация.`,
          en: `Эвкалипт — изменения, гибкость и адаптация.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['11'],
        result_name: JSON.stringify({ ru: 'XI - Сила', en: 'XI - Сила' }),
        result_content: JSON.stringify({
          ru: `Корица — контроль над инстинктами, сила воли.`,
          en: `Корица — контроль над инстинктами, сила воли.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['12'],
        result_name: JSON.stringify({ ru: 'XII - Повешенный', en: 'XII - Повешенный' }),
        result_content: JSON.stringify({
          ru: `Пачули — видение мира с другой точки зрения, жертвенность.`,
          en: `Пачули — видение мира с другой точки зрения, жертвенность.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['13'],
        result_name: JSON.stringify({ ru: 'XIII - Смерть', en: 'XIII - Смерть' }),
        result_content: JSON.stringify({
          ru: `Мирра — трансформация, окончание и новое начало.`,
          en: `Мирра — трансформация, окончание и новое начало.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['14'],
        result_name: JSON.stringify({ ru: 'XIV - Умеренность', en: 'XIV - Умеренность' }),
        result_content: JSON.stringify({
          ru: `Лаванда — баланс, умиротворение и исцеление.`,
          en: `Лаванда — баланс, умиротворение и исцеление.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['15'],
        result_name: JSON.stringify({ ru: 'XV - Дьявол', en: 'XV - Дьявол' }),
        result_content: JSON.stringify({
          ru: `Ветивер — освобождение от зависимостей, глубокие страсти.`,
          en: `Ветивер — освобождение от зависимостей, глубокие страсти.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['16'],
        result_name: JSON.stringify({ ru: 'XVI - Башня', en: 'XVI - Башня' }),
        result_content: JSON.stringify({
          ru: `Лимон — очищение, разрушение старого и внезапные прозрения.`,
          en: `Лимон — очищение, разрушение старого и внезапные прозрения.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['17'],
        result_name: JSON.stringify({ ru: 'XVII - Звезда', en: 'XVII - Звезда' }),
        result_content: JSON.stringify({
          ru: `Нероли — надежда, вдохновение и уверенность в будущем.`,
          en: `Нероли — надежда, вдохновение и уверенность в будущем.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['18'],
        result_name: JSON.stringify({
          ru: `XVIII - Луна`,
          en: `XVIII - Луна`,
        }),
        result_content: JSON.stringify({
          ru: `Жасмин — интуиция, сновидения и подсознательное.`,
          en: `Жасмин — интуиция, сновидения и подсознательное.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['19'],
        result_name: JSON.stringify({ ru: 'XIX - Солнце', en: 'XIX - Солнце' }),
        result_content: JSON.stringify({
          ru: `Грейпфрут — радость, ясность и успех.`,
          en: `Грейпфрут — радость, ясность и успех.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['20'],
        result_name: JSON.stringify({ ru: 'XX - Суд', en: 'XX - Суд' }),
        result_content: JSON.stringify({
          ru: `Ромашка — возрождение, чистый счет и духовное пробуждение.`,
          en: `Ромашка — возрождение, чистый счет и духовное пробуждение.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['21'],
        result_name: JSON.stringify({ ru: 'XXI - Мир', en: 'XXI - Мир' }),
        result_content: JSON.stringify({
          ru: `Нагиеток — завершение, целостность и мир.`,
          en: `Нагиеток — завершение, целостность и мир.`,
        }),
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['22', '0'],
        result_name: JSON.stringify({ ru: '0 ИЛИ 22 - Глупец', en: '0 ИЛИ 22 - Глупец' }),
        result_content: JSON.stringify({
          ru: `Бергамот — символ новых начинаний и свободы.`,
          en: `Бергамот — символ новых начинаний и свободы.`,
        }),
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, {
      formula_type_id: [
        FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
      ],
    })
  }
}
