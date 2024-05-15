import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { StatusUserResponse, UserResponse } from './response'
import { CreateUserDto, ResetUserPasswordDto, UpdateUserDto, UpdateUserPasswordDto } from './dto'
import { CreatePersonDto } from '../person/dto'
import { Person } from '../person/entities/person.entity'
import * as bcrypt from 'bcrypt'
import { RolesEnum } from 'src/common/constants/constants'
import { CreateAuthCodeDto } from '../auth_code/dto'
import { AuthCodeService } from '../auth_code/auth_code.service'
import { I18nService } from 'nestjs-i18n'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly authCodeService: AuthCodeService,
    private readonly i18n: I18nService,
    private dataSource: DataSource,
  ) {}

  async create(user: CreateUserDto, code: CreateAuthCodeDto): Promise<StatusUserResponse> {
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
      const newUser = await queryRunner.manager
        .getRepository(User)
        .createQueryBuilder()
        .useTransaction(true)
        .insert()
        .values({
          user_uuid: personUuid,
          ...user,
          person_uuid: personUuid,
          role_id: RolesEnum.USER,
        })
        .returning('*')
        .execute()

      const result = newUser.raw[0]
      if (result) {
        delete result['password']

        await this.authCodeService.deleteAuthCode(code, queryRunner, true)

        await queryRunner.commitTransaction()
        return { status: true, data: result }
      } else {
        await queryRunner.rollbackTransaction()
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async findByUuid(user_uuid: string, includeJoins: boolean = true): Promise<UserResponse> {
    try {
      let query = this.usersRepository.createQueryBuilder('user').select()
      if (includeJoins) {
        query = query
          .leftJoinAndSelect('user.role', 'role')
          .leftJoinAndSelect('user.person', 'person')
      }
      query = query.where('user.user_uuid = :user_uuid', { user_uuid })

      const user = await query.getOne()
      delete user['password']

      return user
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isUserExists({
    phone,
    email,
    user_uuid,
  }: {
    phone?: string
    email?: string
    user_uuid?: string
  }): Promise<boolean> {
    try {
      const isUserExists = await this.usersRepository
        .createQueryBuilder()
        .select(['User.user_uuid', 'User.email', 'User.phone'])
        .where('User.phone = :phone', { phone })
        .orWhere('User.email = :email', { email })
        .orWhere('User.user_uuid = :user_uuid', { user_uuid })
        .getExists()

      return isUserExists
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
      const user = await this.findByUuid(user_uuid, false)

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

  async update(user: UpdateUserDto, user_uuid: string): Promise<StatusUserResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
      const updatePerson = await queryRunner.manager
        .getRepository(Person)
        .createQueryBuilder()
        .useTransaction(true)
        .update()
        .set({ ...user })
        .where('person_uuid = :person_uuid', { person_uuid: user_uuid })
        .execute()

      if (updatePerson.affected != 0) {
        await queryRunner.commitTransaction()
        return { status: true }
      } else {
        await queryRunner.rollbackTransaction()
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      await queryRunner.rollbackTransaction()
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  async updatePassword(
    updateUserPasswordDto: UpdateUserPasswordDto,
    user_uuid: string,
  ): Promise<StatusUserResponse> {
    try {
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .select(['user.password'])
        .where('user.user_uuid = :user_uuid', { user_uuid })
        .getOne()

      if (await bcrypt.compare(updateUserPasswordDto.old_password, user.password)) {
        const newPassword = await bcrypt.hash(updateUserPasswordDto.password.toString(), 10)
        const updateUserPassword = await this.usersRepository
          .createQueryBuilder()
          .update()
          .set({ password: newPassword })
          .where('user_uuid = :user_uuid', { user_uuid })
          .execute()

        if (updateUserPassword.affected > 0) {
          return { status: true }
        } else {
          return { status: false }
        }
      } else {
        throw new HttpException(
          await this.i18n.t('errors.password_mismatch'),
          HttpStatus.BAD_REQUEST,
        )
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async resetPassword(resetUserPasswordDto: ResetUserPasswordDto): Promise<StatusUserResponse> {
    try {
      const code = await this.authCodeService.findCode(resetUserPasswordDto.code)

      console.log(code)

      if (code) {
        const user = await this.usersRepository
          .createQueryBuilder('user')
          .select(['user.user_uuid', 'user.phone'])
          .where('user.phone = :phone OR user.email = :email', {
            phone: code.phone,
            email: code.email,
          })
          .getOne()

        const newPassword = await bcrypt.hash(resetUserPasswordDto.password.toString(), 10)
        const updateUserPassword = await this.usersRepository
          .createQueryBuilder()
          .update()
          .set({ password: newPassword })
          .where('user_uuid = :user_uuid', { user_uuid: user.user_uuid })
          .execute()

        const codeDto = new CreateAuthCodeDto()
        codeDto.auth_code = code.auth_code
        codeDto.email = code.email
        codeDto.phone = code.phone

        await this.authCodeService.deleteAuthCode(codeDto)

        if (updateUserPassword.affected > 0) {
          return { status: true }
        } else {
          return { status: false }
        }
      } else {
        throw new HttpException(await this.i18n.t('errors.invalid_code'), HttpStatus.BAD_REQUEST)
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(user_uuid: string): Promise<StatusUserResponse> {
    try {
      const deleteUser = await this.usersRepository
        .createQueryBuilder()
        .update()
        .set({ is_active: false })
        .where('user_uuid = :user_uuid', { user_uuid })
        .execute()

      if (deleteUser.affected != 0) {
        return { status: true }
      } else {
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
