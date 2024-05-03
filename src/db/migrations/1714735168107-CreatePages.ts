import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePages1714735168107 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'PageTypes',
        columns: [
          {
            name: 'page_type_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'page_type_name',
            type: 'json',
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
            name: 'page_type_id',
            type: 'int',
          },
          {
            name: 'page_keys',
            type: 'varchar[]',
          },
          {
            name: 'page_name',
            type: 'varchar',
          },
          {
            name: 'page_image',
            type: 'varchar',
          },
          {
            name: 'page_content',
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
      'Pages',
      new TableForeignKey({
        columnNames: ['page_type_id'],
        referencedColumnNames: ['page_type_id'],
        referencedTableName: 'PageTypes',
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
    await queryRunner.dropTable('PageTypes')
  }
}
