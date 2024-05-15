import { PageTypesEnum } from 'src/common/constants/constants'
import { Page } from 'src/modules/page/entities/page.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedHealthNumerology1715764391182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //ЧИСЛО СУДЬБЫ И ПСИХОСОМАТИКА
    for (let index = 1; index <= 9; index++) {
      await queryRunner.manager.insert(Page, [
        {
          page_type_id: PageTypesEnum.NUMBER_OF_FATE,
          page_keys: [index.toString()],
          page_name: index.toString(),
          page_image: '',
          page_content: '',
          language_code: 'ru',
        },
        {
          page_type_id: PageTypesEnum.NUMBER_OF_FATE,
          page_keys: [index.toString()],
          page_name: index.toString(),
          page_image: '',
          page_content: '',
          language_code: 'en',
        },
      ])
    }

    //ХРОНИЧЕСКИЕ ЗАБОЛЕВАНИЯ
    for (let index = 1; index <= 22; index++) {
      await queryRunner.manager.insert(Page, [
        {
          page_type_id: PageTypesEnum.CHRONIC_DISEASES,
          page_keys: [index.toString()],
          page_name: index.toString(),
          page_image: '',
          page_content: '',
          language_code: 'ru',
        },
        {
          page_type_id: PageTypesEnum.CHRONIC_DISEASES,
          page_keys: [index.toString()],
          page_name: index.toString(),
          page_image: '',
          page_content: '',
          language_code: 'en',
        },
      ])
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Page, {
      page_type_id: [PageTypesEnum.NUMBER_OF_FATE, PageTypesEnum.CHRONIC_DISEASES],
    })
  }
}
