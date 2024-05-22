import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePages1715776896240 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Pages',
        columns: [
          {
            name: 'page_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'page_name',
            type: 'json',
          },
          {
            name: 'page_description',
            type: 'json',
            default: `to_json('{\"ru\":\"\",\"en\":\"\"}'::text)`,
          },
          {
            name: 'page_image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'page_icon',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'color',
            type: 'varchar',
            default: `'#000000'`,
          },
          {
            name: 'key',
            type: 'varchar',
          },
          {
            name: 'category_id',
            type: 'int',
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
      'Pages',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['category_id'],
        referencedTableName: 'Categories',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Pages')
  }
}
