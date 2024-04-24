import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AuthDto, CreateAuthDto } from './dto/auth.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Auth } from './entities/auth.entity'
import { ConfigService } from '@nestjs/config'
import { sign, verify } from 'crypto'
import { UserService } from '../user/user.service'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { I18nService } from 'nestjs-i18n'
import { AuthResponse } from './response'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private authRepository: Repository<Auth>,
    private readonly usersService: UserService,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  // async create(createAuthDto: CreateAuthDto) {
  //   try {
  //     const newAuth = await this.authRepository.create(createAuthDto)

  //     return newAuth
  //   } catch (error) {
  //     throw new HttpException(error.message, error.status ?? 500)
  //   }
  // }

  // async login(auth: AuthDto, values: { userAgent: string; ipAddress: string }) {
  //   const loginData = await this.usersService.findByPhone(auth.phone)

  //   if (await bcrypt.compare(auth.password, loginData.password)) {
  //     delete loginData['password']
  //     return this.newRefreshAndAccessToken(loginData, values)
  //   } else {
  //     throw new HttpException(await this.i18n.t('error.wrong_credentials'), HttpStatus.FORBIDDEN)
  //   }
  // }

  // private async newRefreshAndAccessToken(
  //   loginData: any,
  //   values: { userAgent: string; ipAddress: string },
  // ): Promise<AuthResponse> {
  //   const authObject = new CreateAuthDto()
  //   authObject.user_id = loginData.user_id
  //   authObject.user_agent = values.userAgent
  //   authObject.ip_address = values.ipAddress

  //   const auth = await this.create(authObject)

  //   const authJson = {
  //     refreshToken: auth.sign(),
  //     accessToken: sign(
  //       {
  //         ...loginData,
  //       },
  //       this.configService.get('access_secret'),
  //       {
  //         expiresIn: '12h',
  //       },
  //     ),
  //   }

  //   return authJson
  // }

  // async refresh(refreshStr: string): Promise<string | undefined> {
  //   const refreshToken = await this.retrieveRefreshToken(refreshStr)
  //   if (!refreshToken) {
  //     throw new HttpException(AppError.INVALID_JWT, HttpStatus.FORBIDDEN)
  //   }

  //   const user = await this.usersService.findById(refreshToken.user_id)

  //   if (!user) {
  //     throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND)
  //   }

  //   const loginData = await this.usersService.findByEmail(user.email)
  //   delete loginData['password']

  //   const accessToken = {
  //     ...loginData,
  //   }

  //   return sign(accessToken, this.configService.get('access_secret'), {
  //     expiresIn: '12h',
  //   })
  // }

  // private async retrieveRefreshToken(refreshStr: string): Promise<Auth | undefined> {
  //   try {
  //     const decoded = verify(refreshStr, this.configService.get('refresh_token'))
  //     if (typeof decoded === 'string') {
  //       return undefined
  //     }

  //     const auth_id = decoded.dataValues.auth_id
  //     return await this.authRepository.findOne({ where: { auth_id } })
  //   } catch (error) {
  //     throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }

  // async logout(refreshStr): Promise<void> {
  //   const refreshToken = await this.retrieveRefreshToken(refreshStr)

  //   if (!refreshToken) {
  //     return
  //   }

  //   const auth_id = refreshToken.auth_id

  //   const foundAuth = await this.authRepository.findOne({ where: { auth_id } })
  //   if (!foundAuth) {
  //     throw new HttpException(AppError.INVALID_JWT, HttpStatus.FORBIDDEN)
  //   }

  //   await this.authRepository.destroy({ where: { auth_id } })
  // }

  // async logoutAll(user_id: string) {
  //   await this.authRepository.destroy({ where: { user_id } })
  // }
}
