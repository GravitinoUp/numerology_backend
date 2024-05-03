import { Controller, UseFilters } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { NumberService } from './number.service'

@ApiBearerAuth()
@ApiTags('Numbers')
@Controller('number')
@UseFilters(AllExceptionsFilter)
export class NumberController {
  constructor(
    private readonly numberService: NumberService,
    private readonly i18n: I18nService,
  ) {}
}
