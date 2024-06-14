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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { FormulaTypeService } from './formula-type.service'
import { I18nService } from 'nestjs-i18n'
import { AppStrings } from 'src/common/constants/strings'
import { FormulaTypeResponse, StatusFormulaTypeResponse } from './response'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ActiveGuard } from '../auth/guards/active.guard'
import { UpdateFormulaTypeDto } from './dto'
import { CacheRoutes, RolesEnum } from 'src/common/constants/constants'
import { Roles } from '../role/guards/decorators/role.decorator'
import { RolesGuard } from '../role/guards/roles.guard'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'

@ApiBearerAuth()
@ApiTags('Formula Types')
@Controller('formula-type')
@UseFilters(AllExceptionsFilter)
export class FormulaTypeController {
  constructor(
    private readonly formulaTypeService: FormulaTypeService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.FORMULA_TYPE_GET_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.FORMULA_TYPE_GET_ALL_RESPONSE,
    type: FormulaTypeResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('all')
  async findAll(@Req() request, @Query('format_names') format_names?: string) {
    const key = `${CacheRoutes.FORMULA_TYPES}/all-${request.i18nLang}-${format_names}`
    let types: FormulaTypeResponse[] = await this.cacheManager.get(key)

    if (types) {
      return types
    } else {
      types = await this.formulaTypeService.findAll(request.i18nLang, format_names)
      await this.cacheManager.set(key, types)
      return types
    }
  }

  @ApiOperation({ summary: AppStrings.FORMULA_TYPE_GET_BY_KEY_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.FORMULA_TYPE_GET_BY_KEY_RESPONSE,
    type: FormulaTypeResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Get('all/:type_key')
  async findAllByType(
    @Param('type_key') type_key: string,
    @Req() request,
    @Query('format_names') format_names?: string,
  ) {
    const key = `${CacheRoutes.FORMULA_TYPES}/all-${type_key}-${request.i18nLang}-${format_names}`
    let types: FormulaTypeResponse[] = await this.cacheManager.get(key)

    if (types) {
      return types
    } else {
      types = await this.formulaTypeService.findAllByType(type_key, request.i18nLang, format_names)
      await this.cacheManager.set(key, types)
      return types
    }
  }

  @ApiOperation({ summary: AppStrings.FORMULA_TYPE_GET_ONE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.FORMULA_TYPE_GET_ONE_RESPONSE,
    type: FormulaTypeResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get(':id')
  async findOne(@Param('id') formula_type_id: number, @Req() request) {
    const key = `${CacheRoutes.FORMULA_TYPES}/${formula_type_id}-${request.i18nLang}`
    let type: FormulaTypeResponse = await this.cacheManager.get(key)

    if (type) {
      return type
    } else {
      type = await this.formulaTypeService.findOne(formula_type_id, request.i18nLang)
      await this.cacheManager.set(key, type)
      return type
    }
  }

  @ApiOperation({ summary: AppStrings.FORMULA_TYPE_UPDATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.FORMULA_TYPE_UPDATE_RESPONSE,
    type: StatusFormulaTypeResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Patch()
  async update(@Body() updateFormulaTypeDto: UpdateFormulaTypeDto) {
    const isExists = await this.formulaTypeService.isExists(updateFormulaTypeDto.formula_type_id)
    if (!isExists) {
      throw new HttpException(await this.i18n.t('errors.formula_type_not_found'), HttpStatus.NOT_FOUND)
    }

    const result = await this.formulaTypeService.update(updateFormulaTypeDto)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.FORMULA_TYPES}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const resultKeys = await this.cacheManager.store.keys(`${CacheRoutes.RESULTS}*`) // Удаление кэша результатов
    for (const key of resultKeys) {
      await this.cacheManager.del(key)
    }
  }
}
