import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdatePerson1718870877995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE public."Users" ALTER COLUMN phone DROP NOT NULL;')
    await queryRunner.query('ALTER TABLE public."Users" ALTER COLUMN password DROP NOT NULL;')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE public."Users" ALTER COLUMN phone SET NOT NULL;')
    await queryRunner.query('ALTER TABLE public."Users" ALTER COLUMN password SET NOT NULL;')
  }
}
