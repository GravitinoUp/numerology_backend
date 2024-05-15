import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { PageTypeService } from './page_type.service'
import { I18nService } from 'nestjs-i18n'
import { AppStrings } from 'src/common/constants/strings'
import { PageTypeResponse, StatusPageTypeResponse } from './response'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ActiveGuard } from '../auth/guards/active.guard'
import { UpdatePageTypeDto } from './dto'
import { RolesEnum } from 'src/common/constants/constants'
import { Roles } from '../role/guards/decorators/role.decorator'
import { RolesGuard } from '../role/guards/roles.guard'

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
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('all')
  async findAll(@Req() request) {
    const result = await this.pageTypeService.findAll(request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.PAGE_TYPE_GET_ONE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PAGE_TYPE_GET_ONE_RESPONSE,
    type: PageTypeResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get(':id')
  async findOne(@Param('id') page_type_id: number, @Req() request) {
    const result = await this.pageTypeService.findOne(page_type_id, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.PAGE_TYPE_UPDATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PAGE_TYPE_UPDATE_RESPONSE,
    type: StatusPageTypeResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Patch()
  async update(@Body() updatePageTypeDto: UpdatePageTypeDto) {
    const isPageTypeExists = await this.pageTypeService.isPageTypeExists(
      updatePageTypeDto.page_type_id,
    )
    if (!isPageTypeExists) {
      throw new HttpException(await this.i18n.t('errors.page_type_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.pageTypeService.update(updatePageTypeDto)
    return result
  }
}
