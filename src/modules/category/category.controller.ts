import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CategoryResponse, StatusCategoryResponse } from './response'
import { UpdateCategoryDto } from './dto'
import { I18nService } from 'nestjs-i18n'

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('category')
@UseFilters(AllExceptionsFilter)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly i18n: I18nService,
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
  async findAll(@Req() request) {
    const result = await this.categoryService.findAll(request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.CATEGORY_UPDATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.CATEGORY_UPDATE_RESPONSE,
    type: StatusCategoryResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  async update(@Body() updateCategory: UpdateCategoryDto) {
    const isCategoryExists = await this.categoryService.isCategoryExists(updateCategory.category_id)
    if (!isCategoryExists) {
      throw new HttpException(await this.i18n.t('errors.category_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.categoryService.update(updateCategory)
    return result
  }
}
