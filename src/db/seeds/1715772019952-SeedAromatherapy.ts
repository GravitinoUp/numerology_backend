import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedAromatherapy1715772019952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['1'],
        result_name: 'Лидерство, инициатива',
        result_content: `- *Масло розмарина* – стимулирует ум и концентрацию, добавляет энергии.
        - *Масло эвкалипта* – освежает, придаёт силы и помогает сосредоточиться.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['2'],
        result_name: 'Гармония, партнёрство',
        result_content: `- *Масло ромашки* – успокаивает, уменьшает стресс и способствует миру.
        - *Масло иланг-иланга* – уравновешивает эмоции, способствует релаксации.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['3'],
        result_name: 'Коммуникация, творчество',
        result_content: `- *Масло лимона* – стимулирует ум и поднимает настроение.
        - *Масло грейпфрута* – активизирует и освежает, поднимает дух.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['4'],
        result_name: 'Стабильность, порядок',
        result_content: `- *Масло кедра* – создаёт ощущение устойчивости и комфорта.
        - *Масло ветивера* – помогает укрепить нервную систему, добавляет уверенности.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['5'],
        result_name: 'Приключение, изменения',
        result_content: `- *Масло перечной мяты* – освежает, стимулирует новые идеи, придаёт энергию.
        - *Масло имбиря* – добавляет тепла и остроты, стимулирует движение вперёд.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['6'],
        result_name: 'Забота, ответственность',
        result_content: `- *Масло лаванды* – уменьшает анксиозность, способствует спокойствию и заботе.
        - *Масло розы* – улучшает настроение, помогает в эмоциональном балансе.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['7'],
        result_name: 'Духовность, мудрость',
        result_content: `- *Масло франкинсенса* – способствует медитации, углублению мыслей.
        - *Масло мирры* – поддерживает духовные практики, углубляет медитативные состояния.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['8'],
        result_name: 'Сила, успех',
        result_content: `- *Масло сандала* – помогает углубиться в себя, поддерживает при духовных поисках и медитации.
        - *Масло пачули* – укрепляет энергетический фон, способствует привлечению успеха.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['9'],
        result_name: 'Гуманитарность, завершение',
        result_content: `- *Масло нероли* – снимает напряжение, помогает справиться с горем и утратой.
        - *Масло жасмина* – улучшает настроение, способствует эмоциональной открытости и сочувствию.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['1'],
        result_name: 'Лидерство, инициатива',
        result_content: `- *Масло розмарина* – стимулирует ум и концентрацию, добавляет энергии.
        - *Масло эвкалипта* – освежает, придаёт силы и помогает сосредоточиться.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['2'],
        result_name: 'Гармония, партнёрство',
        result_content: `- *Масло ромашки* – успокаивает, уменьшает стресс и способствует миру.
        - *Масло иланг-иланга* – уравновешивает эмоции, способствует релаксации.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['3'],
        result_name: 'Коммуникация, творчество',
        result_content: `- *Масло лимона* – стимулирует ум и поднимает настроение.
        - *Масло грейпфрута* – активизирует и освежает, поднимает дух.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['4'],
        result_name: 'Стабильность, порядок',
        result_content: `- *Масло кедра* – создаёт ощущение устойчивости и комфорта.
        - *Масло ветивера* – помогает укрепить нервную систему, добавляет уверенности.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['5'],
        result_name: 'Приключение, изменения',
        result_content: `- *Масло перечной мяты* – освежает, стимулирует новые идеи, придаёт энергию.
        - *Масло имбиря* – добавляет тепла и остроты, стимулирует движение вперёд.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['6'],
        result_name: 'Забота, ответственность',
        result_content: `- *Масло лаванды* – уменьшает анксиозность, способствует спокойствию и заботе.
        - *Масло розы* – улучшает настроение, помогает в эмоциональном балансе.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['7'],
        result_name: 'Духовность, мудрость',
        result_content: `- *Масло франкинсенса* – способствует медитации, углублению мыслей.
        - *Масло мирры* – поддерживает духовные практики, углубляет медитативные состояния.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['8'],
        result_name: 'Сила, успех',
        result_content: `- *Масло сандала* – помогает углубиться в себя, поддерживает при духовных поисках и медитации.
        - *Масло пачули* – укрепляет энергетический фон, способствует привлечению успеха.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        result_keys: ['9'],
        result_name: 'Гуманитарность, завершение',
        result_content: `- *Масло нероли* – снимает напряжение, помогает справиться с горем и утратой.
        - *Масло жасмина* – улучшает настроение, способствует эмоциональной открытости и сочувствию.`,
        language_code: 'en',
      },
    ])

    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['1'],
        result_name: 'I - Маг',
        result_content: `Мята — активизация ума и коммуникативных способностей.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['2'],
        result_name: 'II - Верховная Жрица',
        result_content: `Лунная трава — усиление интуиции и мистической мудрости.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['3'],
        result_name: 'III - Императрица',
        result_content: `Роза — плодородие, красота и забота.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['4'],
        result_name: 'IV - Император',
        result_content: `Кедр — стабильность, сила и защита.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['5'],
        result_name: 'V - Иерофант',
        result_content: `Франкинсенс — духовное просвещение и связь с традициями.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['6'],
        result_name: 'VI - Влюбленные',
        result_content: `Иланг-иланг — гармония отношений и страстная любовь.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['7'],
        result_name: 'VII - Колесница',
        result_content: `Черный перец — детерминация, смелость и преодоление препятствий.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['8'],
        result_name: 'VIII - Справедливость',
        result_content: `Ладан — ясность, честность и справедливость.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['9'],
        result_name: 'IX - Отшельник',
        result_content: `Сандал — медитация, внутренний поиск и просветление.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['10'],
        result_name: 'X - Колесо Фортуны',
        result_content: `Эвкалипт — изменения, гибкость и адаптация.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['11'],
        result_name: 'XI - Сила',
        result_content: `Корица — контроль над инстинктами, сила воли.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['12'],
        result_name: 'XII - Повешенный',
        result_content: `Пачули — видение мира с другой точки зрения, жертвенность.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['13'],
        result_name: 'XIII - Смерть',
        result_content: `Мирра — трансформация, окончание и новое начало.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['14'],
        result_name: 'XIV - Умеренность',
        result_content: `Лаванда — баланс, умиротворение и исцеление.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['15'],
        result_name: 'XV - Дьявол',
        result_content: `Ветивер — освобождение от зависимостей, глубокие страсти.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['16'],
        result_name: 'XVI - Башня',
        result_content: `Лимон — очищение, разрушение старого и внезапные прозрения.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['17'],
        result_name: 'XVII - Звезда',
        result_content: `Нероли — надежда, вдохновение и уверенность в будущем.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['18'],
        result_name: 'XVIII - Луна',
        result_content: `Жасмин — интуиция, сновидения и подсознательное.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['19'],
        result_name: 'XIX - Солнце',
        result_content: `Грейпфрут — радость, ясность и успех.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['20'],
        result_name: 'XX - Суд',
        result_content: `Ромашка — возрождение, чистый счет и духовное пробуждение.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['21'],
        result_name: 'XXI - Мир',
        result_content: `Нагиеток — завершение, целостность и мир.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['22', '0'],
        result_name: '0 ИЛИ 22 - Глупец',
        result_content: `Бергамот — символ новых начинаний и свободы.`,
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['1'],
        result_name: 'I - Маг',
        result_content: `Мята — активизация ума и коммуникативных способностей.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['2'],
        result_name: 'II - Верховная Жрица',
        result_content: `Лунная трава — усиление интуиции и мистической мудрости.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['3'],
        result_name: 'III - Императрица',
        result_content: `Роза — плодородие, красота и забота.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['4'],
        result_name: 'IV - Император',
        result_content: `Кедр — стабильность, сила и защита.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['5'],
        result_name: 'V - Иерофант',
        result_content: `Франкинсенс — духовное просвещение и связь с традициями.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['6'],
        result_name: 'VI - Влюбленные',
        result_content: `Иланг-иланг — гармония отношений и страстная любовь.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['7'],
        result_name: 'VII - Колесница',
        result_content: `Черный перец — детерминация, смелость и преодоление препятствий.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['8'],
        result_name: 'VIII - Справедливость',
        result_content: `Ладан — ясность, честность и справедливость.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['9'],
        result_name: 'IX - Отшельник',
        result_content: `Сандал — медитация, внутренний поиск и просветление.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['10'],
        result_name: 'X - Колесо Фортуны',
        result_content: `Эвкалипт — изменения, гибкость и адаптация.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['11'],
        result_name: 'XI - Сила',
        result_content: `Корица — контроль над инстинктами, сила воли.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['12'],
        result_name: 'XII - Повешенный',
        result_content: `Пачули — видение мира с другой точки зрения, жертвенность.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['13'],
        result_name: 'XIII - Смерть',
        result_content: `Мирра — трансформация, окончание и новое начало.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['14'],
        result_name: 'XIV - Умеренность',
        result_content: `Лаванда — баланс, умиротворение и исцеление.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['15'],
        result_name: 'XV - Дьявол',
        result_content: `Ветивер — освобождение от зависимостей, глубокие страсти.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['16'],
        result_name: 'XVI - Башня',
        result_content: `Лимон — очищение, разрушение старого и внезапные прозрения.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['17'],
        result_name: 'XVII - Звезда',
        result_content: `Нероли — надежда, вдохновение и уверенность в будущем.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['18'],
        result_name: 'XVIII - Луна',
        result_content: `Жасмин — интуиция, сновидения и подсознательное.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['19'],
        result_name: 'XIX - Солнце',
        result_content: `Грейпфрут — радость, ясность и успех.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['20'],
        result_name: 'XX - Суд',
        result_content: `Ромашка — возрождение, чистый счет и духовное пробуждение.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['21'],
        result_name: 'XXI - Мир',
        result_content: `Нагиеток — завершение, целостность и мир.`,
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
        result_keys: ['22', '0'],
        result_name: '0 ИЛИ 22 - Глупец',
        result_content: `Бергамот — символ новых начинаний и свободы.`,
        language_code: 'en',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, {
      page_type_id: [
        FormulaTypesEnum.SOUL_NUMBER_ESSENTIAL_OIL,
        FormulaTypesEnum.DAY_ARCANE_ESSENTIAL_OIL,
      ],
    })
  }
}
