import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { FormulaResultService } from './formula-result.service'
import { I18nService } from 'nestjs-i18n'
import { FormulaResultResponse, StatusFormulaResultResponse } from './response'
import { CacheRoutes, RolesEnum } from 'src/common/constants/constants'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { Roles } from '../role/guards/decorators/role.decorator'
import { RolesGuard } from '../role/guards/roles.guard'
import { CreateFormulaResultDto, UpdateFormulaResultDto } from './dto'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'

@ApiBearerAuth()
@ApiTags('Results')
@Controller('formula-result')
@UseFilters(AllExceptionsFilter)
export class FormulaResultController {
  constructor(
    private readonly formulaResultService: FormulaResultService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.FORMULA_RESULT_CREATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.FORMULA_RESULT_CREATE_RESPONSE,
    type: StatusFormulaResultResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Post()
  async create(@Body() formulaResult: CreateFormulaResultDto) {
    const result = await this.formulaResultService.create(formulaResult)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.FORMULA_RESULT_GET_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.FORMULA_RESULT_GET_ALL_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Get('all/:type')
  async findAllByType(
    @Param('type') type: number,
    @Req() request,
    @Query('format_names') format_names?: boolean,
  ) {
    const key = `${CacheRoutes.RESULTS}/all/${type}-${request.i18nLang}-${format_names}`
    let results: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (results) {
      return results
    } else {
      results = await this.formulaResultService.findAllByType(type, request.i18nLang, format_names)
      await this.cacheManager.set(key, results)
      return results
    }
  }

  @ApiOperation({ summary: AppStrings.FORMULA_RESULT_UPDATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.FORMULA_RESULT_UPDATE_RESPONSE,
    type: StatusFormulaResultResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Patch()
  async update(@Body() formulaResult: UpdateFormulaResultDto) {
    const isExists = await this.formulaResultService.isFormulaResultExists(
      formulaResult.result_uuid,
    )

    if (!isExists) {
      throw new NotFoundException(this.i18n.t('errors.result_not_found'))
    }

    const result = await this.formulaResultService.update(formulaResult)
    await this.clearCache()
    return result
  }

  @ApiOperation({ summary: AppStrings.FORMULA_RESULT_DELETE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.FORMULA_RESULT_DELETE_RESPONSE,
    type: StatusFormulaResultResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Delete(':uuid')
  async delete(@Param('uuid') id: string) {
    const isExists = await this.formulaResultService.isFormulaResultExists(id)
    if (!isExists) {
      throw new NotFoundException(this.i18n.t('errors.result_not_found'))
    }

    const result = await this.formulaResultService.delete(id)
    await this.clearCache()
    return result
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.RESULTS}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }

    const numberKeys = await this.cacheManager.store.keys(`${CacheRoutes.NUMBERS}*`) // Удаление кэша нумерлогии
    for (const key of numberKeys) {
      await this.cacheManager.del(key)
    }
  }
}
