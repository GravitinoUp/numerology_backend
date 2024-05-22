import { FormulaTypesEnum } from 'src/common/constants/constants'
import { FormulaResult } from 'src/modules/formula-result/entities/formula-result.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedNameTotem1715165238426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(FormulaResult, [
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['1'],
        result_name: JSON.stringify({ ru: 'Феникс', en: 'Феникс' }),
        result_content: JSON.stringify({
          ru: 'Феникс — cимвол возрождения и вечного обновления. Феникс, возрождающийся из пепла, идеально подходит для числа 1, символизирующего новые начинания и первенство.',
          en: 'Феникс — cимвол возрождения и вечного обновления. Феникс, возрождающийся из пепла, идеально подходит для числа 1, символизирующего новые начинания и первенство.',
        }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-phoenix.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['2'],
        result_name: JSON.stringify({ ru: 'Янус', en: 'Янус' }),
        result_content: JSON.stringify({
          ru: 'Янус — древнеримский бог с двумя лицами, олицетворение времени и решений, глядящий в прошлое и будущее. Отражает двойственность и выбор, связанный с числом 2.',
          en: 'Янус — древнеримский бог с двумя лицами, олицетворение времени и решений, глядящий в прошлое и будущее. Отражает двойственность и выбор, связанный с числом 2.',
        }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-janus.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['3'],
        result_name: JSON.stringify({ ru: 'Локи', en: 'Локи' }),
        result_content: JSON.stringify({
          ru: 'Локи — скандинавский бог хитрости, символизирует креативность и переменчивость, что соответствует числу 3.',
          en: 'Локи — скандинавский бог хитрости, символизирует креативность и переменчивость, что соответствует числу 3.',
        }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-loki.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['4'],
        result_name: JSON.stringify({ ru: 'Гермес', en: 'Гермес' }),
        result_content: JSON.stringify({
          ru: 'Гермес — олимпийский бог, покровитель путешественников, торговли и воров. Его умение соединять разные миры и сообщения подходит к символике числа 4.',
          en: 'Гермес — олимпийский бог, покровитель путешественников, торговли и воров. Его умение соединять разные миры и сообщения подходит к символике числа 4.',
        }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-hermes.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['5'],
        result_name: JSON.stringify({ ru: 'Аматэрасу', en: 'Аматэрасу' }),
        result_content: JSON.stringify({
          ru: 'Аматэрасу — японская богиня солнца и вселенной, символ света и истины. Она приносит ясность и видение, что ассоциируется с числом 5.',
          en: 'Аматэрасу — японская богиня солнца и вселенной, символ света и истины. Она приносит ясность и видение, что ассоциируется с числом 5.',
        }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-amaterasu.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['6'],
        result_name: JSON.stringify({ ru: 'Гера', en: 'Гера' }),
        result_content: JSON.stringify({
          ru: 'Гера — богиня брака и семьи в греческой мифологии, символизирует защиту и верность, что идеально подходит для числа 6.',
          en: 'Гера — богиня брака и семьи в греческой мифологии, символизирует защиту и верность, что идеально подходит для числа 6.',
        }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-hera.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['7'],
        result_name: JSON.stringify({ ru: 'Один', en: 'Один' }),
        result_content: JSON.stringify({
          ru: 'Один — всевидящий бог мудрости и магии в скандинавской мифологии, соответствует загадочности и поиску знаний, характерным для числа 7.',
          en: 'Один — всевидящий бог мудрости и магии в скандинавской мифологии, соответствует загадочности и поиску знаний, характерным для числа 7.',
        }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-odin.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['8'],
        result_name: JSON.stringify({ ru: 'Анубис', en: 'Анубис' }),
        result_content: JSON.stringify({
          ru: 'Анубис — египетский бог с головой шакала, покровитель загробного мира, ассоциируется с балансом и справедливостью, что отражает значение числа 8.',
          en: 'Анубис — египетский бог с головой шакала, покровитель загробного мира, ассоциируется с балансом и справедливостью, что отражает значение числа 8.',
        }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-anubis.png',
      },
      {
        formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
        result_keys: ['9'],
        result_name: JSON.stringify({ ru: 'Кали', en: 'Кали' }),
        result_content: JSON.stringify({
          ru: 'Кали — индийская богиня времени, смерти и преобразования, символизирует разрушение и обновление, что отражает духовную глубину и завершение, присущие числу 9.',
          en: 'Кали — индийская богиня времени, смерти и преобразования, символизирует разрушение и обновление, что отражает духовную глубину и завершение, присущие числу 9.',
        }),
        result_image: '/files/uploads?path=uploads/images/totems/totem-cali.png',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(FormulaResult, {
      formula_type_id: FormulaTypesEnum.TOTEMIC_ANIMAl,
    })
  }
}
