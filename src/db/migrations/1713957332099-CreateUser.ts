import { MigrationInterface, QueryRunner, Table, TableCheck, TableForeignKey } from 'typeorm'

export class CreateUser1713957332099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'People',
        columns: [
          {
            name: 'person_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'last_name',
            type: 'varchar',
          },
          {
            name: 'first_name',
            type: 'varchar',
          },
          {
            name: 'patronymic',
            type: 'varchar',
          },
          {
            name: 'birthday_day',
            type: 'int',
          },
          {
            name: 'birthday_month',
            type: 'int',
          },
          {
            name: 'birthday_year',
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

    await queryRunner.createCheckConstraints('People', [
      new TableCheck({
        columnNames: ['birthday_day'],
        expression: 'birthday_day > 0 AND birthday_day <= 31',
      }),
      new TableCheck({
        columnNames: ['birthday_month'],
        expression: 'birthday_month > 0 AND birthday_month <= 12',
      }),
      new TableCheck({
        columnNames: ['birthday_year'],
        expression: 'birthday_year > 0 AND birthday_year <= 9999',
      }),
    ])

    await queryRunner.createTable(
      new Table({
        name: 'Roles',
        columns: [
          {
            name: 'role_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'role_name',
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

    await queryRunner.createTable(
      new Table({
        name: 'Users',
        columns: [
          {
            name: 'user_uuid',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'person_uuid',
            type: 'uuid',
          },
          {
            name: 'role_id',
            type: 'int',
          },
          {
            name: 'is_active',
            type: 'bool',
            default: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
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
      'Users',
      new TableForeignKey({
        columnNames: ['person_uuid'],
        referencedColumnNames: ['person_uuid'],
        referencedTableName: 'People',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'Users',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['role_id'],
        referencedTableName: 'Roles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createTable(
      new Table({
        name: 'Auths',
        columns: [
          {
            name: 'auth_uuid',
            type: 'uuid',
            isPrimary: true,
            default: 'gen_random_uuid()',
          },
          {
            name: 'user_uuid',
            type: 'uuid',
          },
          {
            name: 'user_agent',
            type: 'varchar',
            default: true,
          },
          {
            name: 'ip_address',
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
      'Auths',
      new TableForeignKey({
        columnNames: ['user_uuid'],
        referencedColumnNames: ['user_uuid'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Auth')
    await queryRunner.dropTable('Users')
    await queryRunner.dropTable('Roles')
    await queryRunner.dropTable('People')
  }
}
