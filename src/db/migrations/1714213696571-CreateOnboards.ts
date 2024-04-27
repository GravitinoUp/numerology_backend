import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

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
            type: 'varchar',
          },
          {
            name: 'onboard_image',
            type: 'varchar',
          },
          {
            name: 'onboard_description',
            type: 'text',
          },
          {
            name: 'language_code',
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

    await queryRunner.createForeignKey(
      'Onboards',
      new TableForeignKey({
        columnNames: ['language_code'],
        referencedColumnNames: ['language_code'],
        referencedTableName: 'Languages',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Onboards')
  }
}
