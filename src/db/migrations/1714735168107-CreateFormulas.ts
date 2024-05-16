import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateFormulas1714735168107 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'FormulaTypes',
        columns: [
          {
            name: 'formula_type_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'formula_type_name',
            type: 'json',
          },
          {
            name: 'formula_type_description',
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

    await queryRunner.createTable(
      new Table({
        name: 'FormulaResults',
        columns: [
          {
            name: 'result_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'formula_type_id',
            type: 'int',
          },
          {
            name: 'result_keys',
            type: 'varchar[]',
          },
          {
            name: 'result_name',
            type: 'varchar',
          },
          {
            name: 'result_content',
            type: 'text',
          },
          {
            name: 'result_image',
            type: 'text',
            default: `''`,
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
      'FormulaResults',
      new TableForeignKey({
        columnNames: ['formula_type_id'],
        referencedColumnNames: ['formula_type_id'],
        referencedTableName: 'FormulaTypes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'FormulaResults',
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
    await queryRunner.dropTable('Formulas')
    await queryRunner.dropTable('FormulaTypes')
  }
}
