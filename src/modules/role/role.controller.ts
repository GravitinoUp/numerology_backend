import { Controller, UseFilters } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
@UseFilters(AllExceptionsFilter)
export class RoleController {
  constructor() {}
}
