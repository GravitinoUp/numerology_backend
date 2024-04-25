import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { StatusUserResponse, UserResponse } from './response'
import { CreateUserDto } from './dto'
import { CreatePersonDto } from '../person/dto'
import { Person } from '../person/entities/person.entity'
import * as bcrypt from 'bcrypt'
import { Roles } from 'src/common/constants/constants'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(user: CreateUserDto): Promise<StatusUserResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const person = new CreatePersonDto()
      person.last_name = user.last_name
      person.first_name = user.first_name
      person.patronymic = user.patronymic
      person.birthday_day = user.birthday_day
      person.birthday_month = user.birthday_month
      person.birthday_year = user.birthday_year

      const newPerson = await queryRunner.manager.insert(Person, person)
      const personUuid = newPerson.identifiers[0].person_uuid

      user.password = await bcrypt.hash(user.password.toString(), 10)
      await queryRunner.manager.insert(User, {
        user_uuid: personUuid,
        ...user,
        person_uuid: personUuid,
        role_id: Roles.USER,
      })

      await queryRunner.commitTransaction()

      return { status: true }
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async findByUuid(user_uuid: string): Promise<UserResponse> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder()
        .select()
        .where('User.user_uuid = :user_uuid', { user_uuid })
        .getOne()

      delete user['password']

      return user
    } catch (error) {
      console.log(error)

      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async authByPhone(phone: string): Promise<UserResponse> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder()
        .select(['User.user_uuid', 'User.email', 'User.phone', 'User.is_active', 'User.password'])
        .where('User.phone = :phone', { phone })
        .getOne()

      return user
    } catch (error) {
      console.log(error)

      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async canUserActivate(user_uuid: string): Promise<boolean> {
    try {
      const user = await this.findByUuid(user_uuid)

      if (user.is_active) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? 500)
    }
  }
}
