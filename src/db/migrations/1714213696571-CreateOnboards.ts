import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateOnboards1714213696571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Onboards',
        columns: [
          {
            name: 'onboard_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'onboard_name',
            type: 'json',
          },
          {
            name: 'onboard_image',
            type: 'varchar',
          },
          {
            name: 'onboard_description',
            type: 'json',
            default: `to_json('{\"ru\":\"\",\"en\":\"\"}'::text)`,
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
    await queryRunner.dropTable('Onboards')
  }
}
