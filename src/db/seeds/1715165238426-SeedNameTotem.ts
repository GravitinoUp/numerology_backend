import { PageTypesEnum } from 'src/common/constants/constants'
import { Page } from 'src/modules/page/entities/page.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedNameTotem1715165238426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Page, [
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['1'],
        page_name: 'Феникс',
        page_image: '',
        page_content:
          'Феникс — cимвол возрождения и вечного обновления. Феникс, возрождающийся из пепла, идеально подходит для числа 1, символизирующего новые начинания и первенство.',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['2'],
        page_name: 'Янус',
        page_image: '',
        page_content:
          'Янус — древнеримский бог с двумя лицами, олицетворение времени и решений, глядящий в прошлое и будущее. Отражает двойственность и выбор, связанный с числом 2.',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['3'],
        page_name: 'Локи',
        page_image: '',
        page_content:
          'Локи — скандинавский бог хитрости, символизирует креативность и переменчивость, что соответствует числу 3.',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['4'],
        page_name: 'Гермес',
        page_image: '',
        page_content:
          'Гермес — олимпийский бог, покровитель путешественников, торговли и воров. Его умение соединять разные миры и сообщения подходит к символике числа 4.',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['5'],
        page_name: 'Аматэрасу',
        page_image: '',
        page_content:
          'Аматэрасу — японская богиня солнца и вселенной, символ света и истины. Она приносит ясность и видение, что ассоциируется с числом 5.',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['6'],
        page_name: 'Гера',
        page_image: '',
        page_content:
          'Гера — богиня брака и семьи в греческой мифологии, символизирует защиту и верность, что идеально подходит для числа 6.',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['7'],
        page_name: 'Один',
        page_image: '',
        page_content:
          'Один — всевидящий бог мудрости и магии в скандинавской мифологии, соответствует загадочности и поиску знаний, характерным для числа 7.',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['8'],
        page_name: 'Анубис',
        page_image: '',
        page_content:
          'Анубис — египетский бог с головой шакала, покровитель загробного мира, ассоциируется с балансом и справедливостью, что отражает значение числа 8.',
        language_code: 'ru',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['9'],
        page_name: 'Кали',
        page_image: '',
        page_content:
          'Кали — индийская богиня времени, смерти и преобразования, символизирует разрушение и обновление, что отражает духовную глубину и завершение, присущие числу 9.',
        language_code: 'ru',
      },
    ])

    await queryRunner.manager.insert(Page, [
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['1'],
        page_name: 'Феникс',
        page_image: '',
        page_content:
          'Феникс — cимвол возрождения и вечного обновления. Феникс, возрождающийся из пепла, идеально подходит для числа 1, символизирующего новые начинания и первенство.',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['2'],
        page_name: 'Янус',
        page_image: '',
        page_content:
          'Янус — древнеримский бог с двумя лицами, олицетворение времени и решений, глядящий в прошлое и будущее. Отражает двойственность и выбор, связанный с числом 2.',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['3'],
        page_name: 'Локи',
        page_image: '',
        page_content:
          'Локи — скандинавский бог хитрости, символизирует креативность и переменчивость, что соответствует числу 3.',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['4'],
        page_name: 'Гермес',
        page_image: '',
        page_content:
          'Гермес — олимпийский бог, покровитель путешественников, торговли и воров. Его умение соединять разные миры и сообщения подходит к символике числа 4.',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['5'],
        page_name: 'Аматэрасу',
        page_image: '',
        page_content:
          'Аматэрасу — японская богиня солнца и вселенной, символ света и истины. Она приносит ясность и видение, что ассоциируется с числом 5.',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['6'],
        page_name: 'Гера',
        page_image: '',
        page_content:
          'Гера — богиня брака и семьи в греческой мифологии, символизирует защиту и верность, что идеально подходит для числа 6.',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['7'],
        page_name: 'Один',
        page_image: '',
        page_content:
          'Один — всевидящий бог мудрости и магии в скандинавской мифологии, соответствует загадочности и поиску знаний, характерным для числа 7.',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['8'],
        page_name: 'Анубис',
        page_image: '',
        page_content:
          'Анубис — египетский бог с головой шакала, покровитель загробного мира, ассоциируется с балансом и справедливостью, что отражает значение числа 8.',
        language_code: 'en',
      },
      {
        page_type_id: PageTypesEnum.TOTEMIC_ANIMAl,
        page_keys: ['9'],
        page_name: 'Кали',
        page_image: '',
        page_content:
          'Кали — индийская богиня времени, смерти и преобразования, символизирует разрушение и обновление, что отражает духовную глубину и завершение, присущие числу 9.',
        language_code: 'en',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Page, { page_type_id: PageTypesEnum.TOTEMIC_ANIMAl })
  }
}
