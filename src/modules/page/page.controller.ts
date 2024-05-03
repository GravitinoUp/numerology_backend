import { Controller, UseFilters, HttpStatus, Get, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { PageService } from './page.service'
import { PageResponse } from './response'

@ApiBearerAuth()
@ApiTags('Pages')
@Controller('page')
@UseFilters(AllExceptionsFilter)
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @ApiOperation({ summary: AppStrings.PAGE_GET_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PAGE_GET_ALL_RESPONSE,
    type: PageResponse,
    isArray: true,
  })
  @Get('all')
  async findAll(@Req() request) {
    const result = await this.pageService.findAll(request.i18nLang)

    return result
  }
}
