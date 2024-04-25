import { Controller, UseFilters } from '@nestjs/common'
import { RoleService } from './role.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { I18nService } from 'nestjs-i18n'

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
@UseFilters(AllExceptionsFilter)
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly i18n: I18nService,
  ) {}
}
