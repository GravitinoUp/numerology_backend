import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { PageService } from './page.service'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CacheRoutes, RolesEnum } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { Roles } from '../role/guards/decorators/role.decorator'
import { RolesGuard } from '../role/guards/roles.guard'
import { PageResponse, StatusPageResponse } from './response'
import { I18nService } from 'nestjs-i18n'
import { UpdatePageDto, UpdatePageStatusDto } from './dto'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'

@ApiBearerAuth()
@ApiTags('Pages')
@Controller('page')
@UseFilters(AllExceptionsFilter)
export class PageController {
  constructor(
    private readonly pageService: PageService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
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
  async findAll(@Req() request, @Query('format_names') format_names?: string) {
    const key = `${CacheRoutes.PAGES}/all-${request.i18nLang}-${format_names}`
    let result: PageResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.pageService.findAll(request.i18nLang, format_names)
      await this.cacheManager.set(key, result)
      return result
    }
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
  async findByCategory(
    @Param('category_id') categoryId: number,
    @Req() request,
    @Query('format_names') format_names?: string,
  ) {
    const key = `${CacheRoutes.PAGES}/all/${categoryId}-${request.i18nLang}-${format_names}`
    let result: PageResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.pageService.findByCategory(categoryId, request.i18nLang, format_names)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.PAGE_UPDATE_STATUS_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PAGE_UPDATE_STATUS_RESPONSE,
    type: StatusPageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Patch('status')
  async updateStatus(@Body() pageStatus: UpdatePageStatusDto) {
    const isCategoryExists = await this.pageService.isExists(pageStatus.page_uuid)
    if (!isCategoryExists) {
      throw new HttpException(await this.i18n.t('errors.page_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.pageService.updateStatus(pageStatus)
    await this.clearCache()
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
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.PAGES}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
