import { Controller, Get, HttpStatus, Req, UseFilters } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { PageTypeService } from './page_type.service'
import { I18nService } from 'nestjs-i18n'
import { AppStrings } from 'src/common/constants/strings'
import { PageTypeResponse } from './response'

@ApiBearerAuth()
@ApiTags('PageTypes')
@Controller('page-type')
@UseFilters(AllExceptionsFilter)
export class PageTypeController {
  constructor(
    private readonly pageTypeService: PageTypeService,
    private readonly i18n: I18nService,
  ) {}

  @ApiOperation({ summary: AppStrings.PAGE_TYPE_GET_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PAGE_TYPE_GET_ALL_RESPONSE,
    type: PageTypeResponse,
    isArray: true,
  })
  @Get('all')
  async findAll(@Req() request) {
    const result = await this.pageTypeService.findAll(request.i18nLang)

    return result
  }
}
