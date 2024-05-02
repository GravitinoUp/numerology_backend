import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { AuthCode } from './entities/auth_code.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource, DeleteResult, QueryRunner } from 'typeorm'
import { Cron, CronExpression } from '@nestjs/schedule'
import * as moment from 'moment'
import getRandomInt from 'src/common/utils/get_random_int'
import { StatusAuthCodeResponse } from './response'
import { CreateAuthCodeDto, SendEmailAuthCodeDto, SendPhoneAuthCodeDto } from './dto'
import { AppErrors } from 'src/common/constants/errors'
import { codeTTL } from 'src/common/constants/constants'

@Injectable()
export class AuthCodeService {
  constructor(
    @InjectRepository(AuthCode)
    private authCodeRepository: Repository<AuthCode>,
    private dataSource: DataSource,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleCron() {
    try {
      await this.authCodeRepository
        .createQueryBuilder()
        .delete()
        .where('created_at <= :date', {
          date: moment().subtract(codeTTL, 'minutes').format('DD.MM.yyyy HH:mm:ss'),
        })
        .execute()

      Logger.debug('Delete expired codes')
    } catch (e) {
      Logger.error(e)
    }
  }

  async generateCode(phone?: string, email?: string, attempt: number = 1): Promise<number> {
    try {
      const code = getRandomInt(100000, 999999)

      const codeExists = await this.authCodeRepository
        .createQueryBuilder()
        .select('auth_code')
        .where('auth_code = :code AND (phone = :phone OR email = :email)', { code, phone, email })
        .getExists()

      if (codeExists) {
        if (attempt >= 10) {
          throw new HttpException(AppErrors.CODE_EXISTS, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return await this.generateCode(phone, email, ++attempt)
      } else {
        const newAuthCode = await this.authCodeRepository
          .createQueryBuilder()
          .insert()
          .values({
            auth_code: code,
            phone: phone,
            email: email,
          })
          .returning('*')
          .execute()

        const result: AuthCode = newAuthCode.raw[0]

        return result.auth_code
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async sendPhoneCode(sendPhoneAuthCodeDto: SendPhoneAuthCodeDto): Promise<StatusAuthCodeResponse> {
    try {
      const generatedCode = await this.generateCode(sendPhoneAuthCodeDto.phone)
      console.log(generatedCode)

      // SEND CODE TODO

      return { status: true }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async sendEmailCode(sendEmailAuthCodeDto: SendEmailAuthCodeDto): Promise<StatusAuthCodeResponse> {
    try {
      const generatedCode = await this.generateCode(null, sendEmailAuthCodeDto.email)
      console.log(generatedCode)

      // SEND CODE TODO

      return { status: true }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async activateCode(code: CreateAuthCodeDto, deleteCode: boolean = true): Promise<boolean> {
    try {
      const codeExists = await this.authCodeRepository
        .createQueryBuilder()
        .select('auth_code')
        .where('auth_code = :code AND (phone = :phone OR email = :email)', {
          code: code.auth_code,
          phone: code.phone,
          email: code.email,
        })
        .andWhere('created_at > :date', {
          date: moment().subtract(codeTTL, 'minutes').format('DD.MM.yyyy HH:mm:ss'),
        })
        .getExists()

      if (codeExists) {
        if (deleteCode) {
          await this.deleteAuthCode(code)
        }

        return true
      } else {
        return false
      }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteAuthCode(
    code: CreateAuthCodeDto,
    qRunner?: QueryRunner,
    useTransaction: boolean = false,
  ): Promise<DeleteResult> {
    const queryRunner = qRunner ?? this.dataSource.createQueryRunner()
    await queryRunner.connect()
    try {
      const result = await queryRunner.manager
        .getRepository(AuthCode)
        .createQueryBuilder()
        .delete()
        .useTransaction(useTransaction)
        .where('auth_code = :code AND (phone = :phone OR email = :email)', {
          code: code.auth_code,
          phone: code.phone,
          email: code.email,
        })
        .execute()

      return result
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      if (!qRunner) await queryRunner.release()
    }
  }
}
