import { PageTypesEnum } from 'src/common/constants/constants'
import { Page } from 'src/modules/page/entities/page.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedPersonalYearNumber1715765353118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //ПЕРСОНАЛЬНОЕ ЧИСЛО ГОДА
    for (let index = 1; index <= 9; index++) {
      await queryRunner.manager.insert(Page, [
        {
          page_type_id: PageTypesEnum.PERSONAL_YEAR_NUMBER,
          page_keys: [index.toString()],
          page_name: index.toString(),
          page_image: '',
          page_content: '',
          language_code: 'ru',
        },
        {
          page_type_id: PageTypesEnum.PERSONAL_YEAR_NUMBER,
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
      page_type_id: PageTypesEnum.PERSONAL_YEAR_NUMBER,
    })
  }
}
