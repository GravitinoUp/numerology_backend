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
import { PageService } from './page.service'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { RolesEnum } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { Roles } from '../role/guards/decorators/role.decorator'
import { RolesGuard } from '../role/guards/roles.guard'
import { PageResponse, StatusPageResponse } from './response'
import { I18nService } from 'nestjs-i18n'
import { UpdatePageDto } from './dto'

@ApiBearerAuth()
@ApiTags('Pages')
@Controller('page')
@UseFilters(AllExceptionsFilter)
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private readonly i18n: I18nService,
  ) {}

  @ApiOperation({ summary: AppStrings.PAGE_GET_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PAGE_GET_ALL_RESPONSE,
    type: PageResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('all')
  async findAll(@Req() request) {
    const result = await this.pageService.findAll(request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.PAGE_GET_BY_CATEGORY_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PAGE_GET_BY_CATEGORY_RESPONSE,
    type: PageResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('all/:category_id')
  async findByCategory(@Param('category_id') categoryId: number, @Req() request) {
    const result = await this.pageService.findByCategory(categoryId, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.PAGE_UPDATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PAGE_UPDATE_RESPONSE,
    type: StatusPageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Patch()
  async update(@Body() updatePage: UpdatePageDto) {
    const isExists = await this.pageService.isExists(updatePage.page_uuid)
    if (!isExists) {
      throw new HttpException(await this.i18n.t('errors.page_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.pageService.update(updatePage)
    return result
  }
}
