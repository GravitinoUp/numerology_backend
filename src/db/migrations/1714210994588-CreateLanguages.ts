import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateLanguages1714210994588 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Languages',
        columns: [
          {
            name: 'language_code',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'language_name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Languages')
  }
}
