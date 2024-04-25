import { Controller, UseFilters } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { AuthCodeService } from './auth_code.service'

@ApiTags('Auth Codes')
@Controller('auth-code')
@UseFilters(AllExceptionsFilter)
export class AuthCodeController {
  constructor(private readonly authCodeService: AuthCodeService) {}
}
