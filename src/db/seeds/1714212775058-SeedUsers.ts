import { Roles } from 'src/common/constants/constants'
import { Person } from 'src/modules/person/entities/person.entity'
import { User } from 'src/modules/user/entities/user.entity'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedUsers1714212775058 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.insert(Person, [
      {
        person_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
        last_name: 'Волкова',
        first_name: 'Евгения',
        patronymic: 'Александровна',
        birthday_day: 18,
        birthday_month: 6,
        birthday_year: 1984,
      },
      {
        person_uuid: '1040ba07-dfea-4032-9a27-dcfc8f04e4f7',
        last_name: 'USER',
        first_name: 'USER',
        patronymic: 'USER',
        birthday_day: 1,
        birthday_month: 1,
        birthday_year: 1,
      },
    ])

    await queryRunner.manager.insert(User, [
      {
        user_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
        person_uuid: 'df33e1fe-664d-4bd1-bf14-12e8cf99e5ac',
        role_id: Roles.ADMIN,
        phone: '+79000000000',
        password: '$2b$10$pC/Kq/QBvFMC8GeTbErDYOpdwHkSQwrPzTbmja0pracuKg8Auppai',
      },
      {
        user_uuid: '1040ba07-dfea-4032-9a27-dcfc8f04e4f7',
        person_uuid: '1040ba07-dfea-4032-9a27-dcfc8f04e4f7',
        role_id: Roles.USER,
        phone: '+78000000000',
        password: '$2b$10$pC/Kq/QBvFMC8GeTbErDYOpdwHkSQwrPzTbmja0pracuKg8Auppai',
      },
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('People')
    await queryRunner.clearTable('Users')
  }
}
