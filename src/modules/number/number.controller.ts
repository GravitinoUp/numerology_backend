import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { NumberService } from './number.service'
import { AppStrings } from 'src/common/constants/strings'
import { FormulaResultResponse } from '../formula-result/response'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { I18nService } from 'nestjs-i18n'
import { GetCompatibilityDto } from './dto'
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager'
import { CacheRoutes } from 'src/common/constants/constants'
import { GraphDataResponse } from './response'

@ApiBearerAuth()
@ApiTags('Numbers')
@Controller('number')
@UseFilters(AllExceptionsFilter)
export class NumberController {
  constructor(
    private readonly numberService: NumberService,
    private readonly i18n: I18nService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @ApiOperation({ summary: AppStrings.FATE_CARD_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.FATE_CARD_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('fate-card')
  async getFateCard(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/fate-card-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getFateCard(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.HEALTH_NUMEROLOGY_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.HEALTH_NUMEROLOGY_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('health')
  async getHealthNumberology(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/health-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getHealthNumerology(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.DISEASES_NUMEROLOGY_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.DISEASES_NUMEROLOGY_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('diseases/:query')
  async getDiseases(@Param('query') query: string, @Req() request) {
    const key = `${CacheRoutes.NUMBERS}/diseases-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getDiseases(request.i18nLang)
      result = result.filter((res) => res.result_name.toLowerCase().includes(query.toLowerCase()))
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.PROFESSIONS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PROFESSIONS_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('professions')
  async getProfessions(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/professions-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getProfessions(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.WEAK_QUALITIES_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.WEAK_QUALITIES_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('weak-qualities')
  async getNegaiveTraits(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/weak-qualities-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getNegativeTraits(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.STRONG_QUALITIES_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.STRONG_QUALITIES_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('strong-qualities')
  async getStrongQualitites(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/strong-qualities-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getStrongQualitites(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.PLANETS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PLANETS_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('planets')
  async getPlanets(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/planets-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getPlanets(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.ANCESTORS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.ANCESTORS_GET_RESPONSE,
    type: FormulaResultResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('ancestors')
  async getAncestors(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/ancestors-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getAncestors(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.TOTEMIC_ANIMALS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.TOTEMIC_ANIMALS_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('totemic-animals')
  async getTotemicAnimals(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/totemic-animals-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getTotemicAnimals(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.DESTINY_PROGRAM_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.DESTINY_PROGRAM_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('destiny-program')
  async getDestinyProgram(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/destiny-program-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getDestinyProgram(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.LUCKY_NUMBERS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.LUCKY_NUMBERS_GET_RESPONSE,
    type: Number,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('lucky-numbers')
  async getLuckyNumbers(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/lucky-numbers-${request.user.user_uuid}-${request.i18nLang}`
    let result: number[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getLuckyNumbers(request.user.user_uuid)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.KARMA_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.KARMA_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('karma')
  async getKarma(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/karma-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getKarma(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.BLOOD_TYPE_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.BLOOD_TYPE_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('blood-type')
  async getBloodType(@Query('query') bloodType: string, @Req() request) {
    const key = `${CacheRoutes.NUMBERS}/blood-type-${bloodType}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getBloodType(bloodType, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.ANGELIC_NUMEROLOGY_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.ANGELIC_NUMEROLOGY_GET_RESPONSE,
    type: FormulaResultResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('angelic-numerology')
  async getAngelicNumerology(@Query('query') time: string, @Req() request) {
    const key = `${CacheRoutes.NUMBERS}/angelic-numerology-${time}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getAngelicNumerology(time, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.GUESSING_NUMBER_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.GUESSING_NUMBER_GET_RESPONSE,
    type: FormulaResultResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('guessing-number')
  async getGuessingNumber(@Query('query') number: number, @Req() request) {
    if (number > 999999999 || number < 100000000) {
      throw new BadRequestException(this.i18n.t('errors.wrong_guessing_number'))
    }
    const key = `${CacheRoutes.NUMBERS}/guessing-number-${number}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getGuessingNumber(number, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.COMPATIBILITY_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.COMPATIBILITY_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post('compatibility')
  async getCompatibility(@Body() compatibilityDto: GetCompatibilityDto, @Req() request) {
    const key = `${CacheRoutes.NUMBERS}/compatibility-${JSON.stringify(compatibilityDto)}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getCompatibility(compatibilityDto, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.PREDICTION_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PREDICTION_GET_RESPONSE,
    type: FormulaResultResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('prediction')
  async getPrediction(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/prediction-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getPersonalYearNumber(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.PHONE_NUMBER_CALCULATION_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.PHONE_NUMBER_CALCULATION_GET_RESPONSE,
    type: FormulaResultResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('phone-calculation')
  async getPhoneNumberCalculation(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/phone-calculation-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getPhoneNumberCalculation(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.HOUSE_NUMBER_CALCULATION_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.HOUSE_NUMBER_CALCULATION_GET_RESPONSE,
    type: FormulaResultResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('house-calculation')
  async getHouseNumberCalculation(@Query('query') number: number, @Req() request) {
    const key = `${CacheRoutes.NUMBERS}/house-calculation-${number}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getHouseNumberCalculation(number, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.FATE_NUMBER_GIFTS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.FATE_NUMBER_GIFTS_GET_RESPONSE,
    type: FormulaResultResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('fate-number-gifts')
  async getFateNumberGift(@Query('query') date: Date, @Req() request) {
    const formattedDate = new Date(date)
    const key = `${CacheRoutes.NUMBERS}/fate-number-gifts-${formattedDate.toISOString()}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getFateNumberGift(formattedDate, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.AROMATHERAPY_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.AROMATHERAPY_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('aromatherapy')
  async getAromatherapy(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/aromatherapy-${request.user.user_uuid}-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getAromatherapy(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.RUNIC_FORMULAS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.RUNIC_FORMULAS_GET_RESPONSE,
    type: FormulaResultResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('runic-formulas')
  async getRunicFormulas(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/runic-formulas-${request.i18nLang}`
    let result: FormulaResultResponse[] = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getRunicFormulas(request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  @ApiOperation({ summary: AppStrings.GRAPHS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.GRAPHS_GET_RESPONSE,
    type: GraphDataResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('graphs')
  async getGraphs(@Req() request) {
    const key = `${CacheRoutes.NUMBERS}/graphs-${request.user.user_uuid}-${request.i18nLang}`
    let result: GraphDataResponse = await this.cacheManager.get(key)

    if (result) {
      return result
    } else {
      result = await this.numberService.getGrahps(request.user.user_uuid, request.i18nLang)
      await this.cacheManager.set(key, result)
      return result
    }
  }

  async clearCache() {
    const keys = await this.cacheManager.store.keys(`${CacheRoutes.NUMBERS}*`) // Удаление кэша
    for (const key of keys) {
      await this.cacheManager.del(key)
    }
  }
}
