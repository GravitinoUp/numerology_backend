import { Controller, UseFilters } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Results')
@Controller('formula-result')
@UseFilters(AllExceptionsFilter)
export class FormulaResultController {}
