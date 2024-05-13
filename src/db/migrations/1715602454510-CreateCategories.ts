import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class CreateCategories1715602454510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Categories',
        columns: [
          {
            name: 'category_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'category_name',
            type: 'json',
          },
          {
            name: 'category_description',
            type: 'json',
            default: `to_json('{\"ru\":\"\",\"en\":\"\"}'::text)`,
          },
          {
            name: 'category_image',
            type: 'varchar',
            isNullable: true,
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

    await queryRunner.addColumn('PageTypes', new TableColumn({ name: 'category_id', type: 'int' }))

    await queryRunner.createForeignKey(
      'PageTypes',
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
    await queryRunner.dropTable('Categories')
  }
}
