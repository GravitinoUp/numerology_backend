import { Controller, Get, HttpStatus, Req, UseFilters, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { I18nService } from 'nestjs-i18n'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { NumberService } from './number.service'
import { AppStrings } from 'src/common/constants/strings'
import { PageResponse } from '../page/response'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'

@ApiBearerAuth()
@ApiTags('Numbers')
@Controller('number')
@UseFilters(AllExceptionsFilter)
export class NumberController {
  constructor(
    private readonly numberService: NumberService,
    private readonly i18n: I18nService,
  ) {}

  @ApiOperation({ summary: AppStrings.FATE_CARD_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.FATE_CARD_GET_RESPONSE,
    type: PageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('fate-card')
  async getFateCard(@Req() request) {
    const result = await this.numberService.getFateCard(request.user.user_uuid, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.FATE_NUMBER_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.FATE_NUMBER_GET_RESPONSE,
    type: PageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('fate-number')
  async getFateNumber(@Req() request) {
    const result = await this.numberService.getFateNumber(request.user.user_uuid, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.CHRONIC_DISEASE_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.CHRONIC_DISEASE_GET_RESPONSE,
    type: PageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('chronic-disease')
  async getChronicDisease(@Req() request) {
    const result = await this.numberService.getChronicDisease(
      request.user.user_uuid,
      request.i18nLang,
    )
    return result
  }

  @ApiOperation({ summary: AppStrings.PROFESSIONS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PROFESSIONS_GET_RESPONSE,
    type: PageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('professions')
  async getProfessions(@Req() request) {
    const result = await this.numberService.getProfessions(request.user.user_uuid, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.NEGATIVE_TRAITS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.NEGATIVE_TRAITS_GET_RESPONSE,
    type: PageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('negative-traits')
  async getNegaiveTraits(@Req() request) {
    const result = await this.numberService.getNegativeTraits(
      request.user.user_uuid,
      request.i18nLang,
    )
    return result
  }

  @ApiOperation({ summary: AppStrings.PLANETS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PLANETS_GET_RESPONSE,
    type: PageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('planets')
  async getPlanets(@Req() request) {
    const result = await this.numberService.getPlanets(request.user.user_uuid, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.PARENTS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PARENTS_GET_RESPONSE,
    type: PageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('parents')
  async getParents(@Req() request) {
    const result = await this.numberService.getParents(request.user.user_uuid, request.i18nLang)
    return result
  }
}
