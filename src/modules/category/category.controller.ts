import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Patch,
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CategoryResponse, StatusCategoryResponse } from './response'
import { UpdateCategoryDto, UpdateCategoryStatusDto } from './dto'
import { I18nService } from 'nestjs-i18n'
import { RolesGuard } from '../role/guards/roles.guard'
import { Roles } from '../role/guards/decorators/role.decorator'
import { CacheRoutes, RolesEnum } from 'src/common/constants/constants'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { CategoryService } from './category.service'

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('category')
@UseFilters(AllExceptionsFilter)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.CATEGORY_GET_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.CATEGORY_GET_ALL_RESPONSE,
    type: CategoryResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('all')
  async findAll(@Req() request, @Query('format_names') format_names?: string) {
    const key = `${CacheRoutes.CATEGORIES}/all-${request.i18nLang}-${format_names}`
    let categories: CategoryResponse[] = await this.cacheManager.get(key)

    if (categories) {
      return categories
    } else {
      categories = await this.categoryService.findAll(request.i18nLang, format_names)
      await this.cacheManager.set(key, categories)
      return categories
    }
  }

  @ApiOperation({ summary: AppStrings.CATEGORY_UPDATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.CATEGORY_UPDATE_RESPONSE,
    type: StatusCategoryResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Patch()
  async update(@Body() updateCategory: UpdateCategoryDto) {
    const isCategoryExists = await this.categoryService.isCategoryExists(updateCategory.category_id)
    if (!isCategoryExists) {
      throw new HttpException(await this.i18n.t('errors.category_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.categoryService.update(updateCategory)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.CATEGORY_UPDATE_STATUS_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.CATEGORY_UPDATE_STATUS_RESPONSE,
    type: StatusCategoryResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Patch('status')
  async updateStatus(@Body() categoryStatus: UpdateCategoryStatusDto) {
    const isCategoryExists = await this.categoryService.isCategoryExists(categoryStatus.category_id)
    if (!isCategoryExists) {
      throw new HttpException(await this.i18n.t('errors.category_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.categoryService.updateStatus(categoryStatus)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.CATEGORIES}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const pageKeys = await this.cacheManager.store.keys(`${CacheRoutes.PAGES}*`) // Удаление кэша страниц
    for (const key of pageKeys) {
      await this.cacheManager.del(key)
    }
  }
}
