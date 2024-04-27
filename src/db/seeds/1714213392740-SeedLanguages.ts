import { Language } from 'src/modules/language/entities/language.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedLanguages1714213392740 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Language, [
      {
        language_code: 'ru',
        language_name: 'Русский',
      },
      {
        language_code: 'en',
        language_name: 'English',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('Languages')
  }
}
