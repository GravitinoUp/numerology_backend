import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreatePurchase1718807507650 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Purchases',
        columns: [
          {
            name: 'purchase_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'user_uuid',
            type: 'uuid',
          },
          {
            name: 'expiration_date',
            type: 'timestamp',
          },
          {
            name: 'product_sku',
            type: 'varchar',
          },
          {
            name: 'page_uuid',
            type: 'uuid',
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
      'Purchases',
      new TableForeignKey({
        name: 'FK_user_uuid',
        columnNames: ['user_uuid'],
        referencedColumnNames: ['user_uuid'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Purchases',
      new TableForeignKey({
        name: 'FK_page_uuid',
        columnNames: ['page_uuid'],
        referencedColumnNames: ['page_uuid'],
        referencedTableName: 'Pages',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Purchases', 'FK_user_uuid')
    await queryRunner.dropForeignKey('Purchases', 'FK_page_uuid')
    await queryRunner.dropTable('Purchases')
  }
}
