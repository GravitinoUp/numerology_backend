import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePages1715776896240 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Pages',
        columns: [
          {
            name: 'page_uuid',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'page_name',
            type: 'varchar',
          },
          {
            name: 'page_description',
            type: 'text',
            default: `''`,
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
            name: 'language_code',
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

    await queryRunner.createForeignKey(
      'Pages',
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
    await queryRunner.dropTable('Pages')
  }
}
