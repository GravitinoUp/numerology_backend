import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { AuthCodeService } from './auth_code.service'
import { CreateAuthCodeDto } from './dto'
import { Throttle } from '@nestjs/throttler'

@ApiTags('Auth Codes')
@Controller('auth-code')
@UseFilters(AllExceptionsFilter)
export class AuthCodeController {
  constructor(private readonly authCodeService: AuthCodeService) {}

  // @ApiOperation({ summary: AppStrings.AUTH_CODE_PHONE_SEND_OPERATION })
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   description: AppStrings.AUTH_CODE_SEND_RESPONSE,
  //   type: StatusAuthCodeResponse,
  // })
  // @Throttle({ default: { limit: 1, ttl: 30000 } })
  // @Post('phone')
  // async sendPhoneCode(@Body() sendPhoneAuthCodeDto: SendPhoneAuthCodeDto) {
  //   const result = await this.authCodeService.sendPhoneCode(sendPhoneAuthCodeDto)
  //   return result
  // }

  // @ApiOperation({ summary: AppStrings.AUTH_CODE_EMAIL_SEND_OPERATION })
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   description: AppStrings.AUTH_CODE_SEND_RESPONSE,
  //   type: StatusAuthCodeResponse,
  // })
  // @Throttle({ default: { limit: 1, ttl: 30000 } })
  // @Post('email')
  // async sendEmailCode(@Body() sendEmailAuthCodeDto: SendEmailAuthCodeDto) {
  //   const result = await this.authCodeService.sendEmailCode(sendEmailAuthCodeDto)
  //   return result
  // }

  @Throttle({ default: { limit: 1, ttl: 5000 } })
  @Post('check')
  async checkCode(@Body() code: CreateAuthCodeDto) {
    return await this.authCodeService.activateCode(code, false)
  }
}
