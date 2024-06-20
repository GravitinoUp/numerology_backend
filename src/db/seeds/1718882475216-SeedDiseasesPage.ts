import { Page } from 'src/modules/page/entities/page.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedDiseasesPage1718882475216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Page, [
      {
        page_name: JSON.stringify({ ru: 'Метафизические причины болезней', en: 'Metaphysical causes of diseases' }),
        page_description: JSON.stringify({
          ru: 'Метафизические причины болезней',
          en: 'Metaphysical causes of diseases',
        }),
        page_image: '/files/uploads?path=uploads/images/pages/diseases.jpg',
        page_icon: '',
        color: '#0085FF',
        key: 'diseases',
        category_id: 3,
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(Page, {
      key: 'diseases',
    })
  }
}
