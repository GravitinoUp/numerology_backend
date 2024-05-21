import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedNameTotem1715165238426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1'],
        result_name: 'Феникс',
        result_content:
          'Феникс — cимвол возрождения и вечного обновления. Феникс, возрождающийся из пепла, идеально подходит для числа 1, символизирующего новые начинания и первенство.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-phoenix.png',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['2'],
        result_name: 'Янус',
        result_content:
          'Янус — древнеримский бог с двумя лицами, олицетворение времени и решений, глядящий в прошлое и будущее. Отражает двойственность и выбор, связанный с числом 2.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-janus.png',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['3'],
        result_name: 'Локи',
        result_content:
          'Локи — скандинавский бог хитрости, символизирует креативность и переменчивость, что соответствует числу 3.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-loki.png',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['4'],
        result_name: 'Гермес',
        result_content:
          'Гермес — олимпийский бог, покровитель путешественников, торговли и воров. Его умение соединять разные миры и сообщения подходит к символике числа 4.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-hermes.png',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['5'],
        result_name: 'Аматэрасу',
        result_content:
          'Аматэрасу — японская богиня солнца и вселенной, символ света и истины. Она приносит ясность и видение, что ассоциируется с числом 5.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-amaterasu.png',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['6'],
        result_name: 'Гера',
        result_content:
          'Гера — богиня брака и семьи в греческой мифологии, символизирует защиту и верность, что идеально подходит для числа 6.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-hera.png',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['7'],
        result_name: 'Один',
        result_content:
          'Один — всевидящий бог мудрости и магии в скандинавской мифологии, соответствует загадочности и поиску знаний, характерным для числа 7.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-odin.png',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['8'],
        result_name: 'Анубис',
        result_content:
          'Анубис — египетский бог с головой шакала, покровитель загробного мира, ассоциируется с балансом и справедливостью, что отражает значение числа 8.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-anubis.png',
        language_code: 'ru',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['9'],
        result_name: 'Кали',
        result_content:
          'Кали — индийская богиня времени, смерти и преобразования, символизирует разрушение и обновление, что отражает духовную глубину и завершение, присущие числу 9.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-cali.png',
        language_code: 'ru',
      },
    ])

    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1'],
        result_name: 'Феникс',
        result_content:
          'Феникс — cимвол возрождения и вечного обновления. Феникс, возрождающийся из пепла, идеально подходит для числа 1, символизирующего новые начинания и первенство.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-phoenix.png',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['2'],
        result_name: 'Янус',
        result_content:
          'Янус — древнеримский бог с двумя лицами, олицетворение времени и решений, глядящий в прошлое и будущее. Отражает двойственность и выбор, связанный с числом 2.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-janus.png',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['3'],
        result_name: 'Локи',
        result_content:
          'Локи — скандинавский бог хитрости, символизирует креативность и переменчивость, что соответствует числу 3.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-loki.png',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['4'],
        result_name: 'Гермес',
        result_content:
          'Гермес — олимпийский бог, покровитель путешественников, торговли и воров. Его умение соединять разные миры и сообщения подходит к символике числа 4.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-hermes.png',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['5'],
        result_name: 'Аматэрасу',
        result_content:
          'Аматэрасу — японская богиня солнца и вселенной, символ света и истины. Она приносит ясность и видение, что ассоциируется с числом 5.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-amaterasu.png',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['6'],
        result_name: 'Гера',
        result_content:
          'Гера — богиня брака и семьи в греческой мифологии, символизирует защиту и верность, что идеально подходит для числа 6.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-hera.png',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['7'],
        result_name: 'Один',
        result_content:
          'Один — всевидящий бог мудрости и магии в скандинавской мифологии, соответствует загадочности и поиску знаний, характерным для числа 7.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-odin.png',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['8'],
        result_name: 'Анубис',
        result_content:
          'Анубис — египетский бог с головой шакала, покровитель загробного мира, ассоциируется с балансом и справедливостью, что отражает значение числа 8.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-anubis.png',
        language_code: 'en',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['9'],
        result_name: 'Кали',
        result_content:
          'Кали — индийская богиня времени, смерти и преобразования, символизирует разрушение и обновление, что отражает духовную глубину и завершение, присущие числу 9.',
        result_image: '/files/uploads?path=uploads/images/totems/totem-cali.png',
        language_code: 'en',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, {
      formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
    })
  }
}
