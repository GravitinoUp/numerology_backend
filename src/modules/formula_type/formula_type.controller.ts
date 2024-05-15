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
import { FormulaTypeService } from './formula_type.service'
import { I18nService } from 'nestjs-i18n'
import { AppStrings } from 'src/common/constants/strings'
import { FormulaTypeResponse, StatusFormulaTypeResponse } from './response'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ActiveGuard } from '../auth/guards/active.guard'
import { UpdateFormulaTypeDto } from './dto'
import { RolesEnum } from 'src/common/constants/constants'
import { Roles } from '../role/guards/decorators/role.decorator'
import { RolesGuard } from '../role/guards/roles.guard'

@ApiBearerAuth()
@ApiTags('Formula Types')
@Controller('formula-type')
@UseFilters(AllExceptionsFilter)
export class FormulaTypeController {
  constructor(
    private readonly formulaTypeService: FormulaTypeService,
    private readonly i18n: I18nService,
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
  async findAll(@Req() request) {
    const result = await this.formulaTypeService.findAll(request.i18nLang)
    return result
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
    const result = await this.formulaTypeService.findOne(formula_type_id, request.i18nLang)
    return result
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
      throw new HttpException(
        await this.i18n.t('errors.formula_type_not_found'),
        HttpStatus.NOT_FOUND,
      )
    }

    const result = await this.formulaTypeService.update(updateFormulaTypeDto)
    return result
  }
}
