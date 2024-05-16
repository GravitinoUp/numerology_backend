import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm'

export class CreateNotifications1715852273894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Notifications',
        columns: [
          {
            name: 'notification_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'notification_name',
            type: 'json',
          },
          {
            name: 'notification_content',
            type: 'json',
            default: `to_json('{\"ru\":\"\",\"en\":\"\"}'::text)`,
          },
          {
            name: 'notification_users',
            type: 'varchar',
            isArray: true,
          },
          {
            name: 'notification_topics',
            type: 'varchar',
            isArray: true,
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

    await queryRunner.addColumn(
      'Users',
      new TableColumn({
        name: 'notification_tokens',
        type: 'varchar',
        isArray: true,
        default: `array[]::varchar[]`,
      }),
    )

    await queryRunner.addColumn(
      'Users',
      new TableColumn({
        name: 'notification_topics',
        type: 'varchar',
        isArray: true,
        default: `array[]::varchar[]`,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Notifications')
  }
}
