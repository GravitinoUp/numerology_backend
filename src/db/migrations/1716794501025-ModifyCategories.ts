import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class ModifyCategories1716794501025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('Pages', [
      new TableColumn({
        name: 'is_active',
        type: 'bool',
        default: true,
      }),
    ])

    await queryRunner.addColumns('Categories', [
      new TableColumn({
        name: 'is_active',
        type: 'bool',
        default: true,
      }),
      new TableColumn({
        name: 'position',
        type: 'int',
        isNullable: true,
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Pages', 'is_active')
    await queryRunner.dropColumn('Categories', 'is_active')
    await queryRunner.dropColumn('Categories', 'position')
  }
}
