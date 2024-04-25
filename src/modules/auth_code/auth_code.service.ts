import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AuthCode } from './entities/auth_code.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, DataSource } from 'typeorm'

@Injectable()
export class AuthCodeService {
  constructor(
    @InjectRepository(AuthCode)
    private authCodeRepository: Repository<AuthCode>,
    private dataSource: DataSource,
  ) {}

  async generateCode(user_uuid: string): Promise<number> {
    try {
      const newAuthCode = await this.authCodeRepository
        .createQueryBuilder()
        .insert()
        .values({
          auth_code: 1111,
          user_uuid: user_uuid,
        })
        .returning('*')
        .execute()

      const result: AuthCode = newAuthCode.raw[0]

      return result.auth_code
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
