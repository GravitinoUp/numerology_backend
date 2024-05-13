import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { NumberService } from './number.service'
import { AppStrings } from 'src/common/constants/strings'
import { PageResponse } from '../page/response'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { I18nService } from 'nestjs-i18n'

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

  // @ApiOperation({ summary: AppStrings.FATE_NUMBER_GET_OPERATION })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: AppStrings.FATE_NUMBER_GET_RESPONSE,
  //   type: PageResponse,
  // })
  // @UseGuards(JwtAuthGuard, ActiveGuard)
  // @Get('fate-number')
  // async getFateNumber(@Req() request) {
  //   const result = await this.numberService.getFateNumber(request.user.user_uuid, request.i18nLang)
  //   return result
  // }

  // @ApiOperation({ summary: AppStrings.CHRONIC_DISEASE_GET_OPERATION })
  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: AppStrings.CHRONIC_DISEASE_GET_RESPONSE,
  //   type: PageResponse,
  // })
  // @UseGuards(JwtAuthGuard, ActiveGuard)
  // @Get('chronic-disease')
  // async getChronicDisease(@Req() request) {
  //   const result = await this.numberService.getChronicDisease(
  //     request.user.user_uuid,
  //     request.i18nLang,
  //   )
  //   return result
  // }

  @ApiOperation({ summary: AppStrings.HEALTH_NUMEROLOGY_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.HEALTH_NUMEROLOGY_GET_RESPONSE,
    type: PageResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('health')
  async getHealthNumberology(@Req() request) {
    const result = await this.numberService.getHealthNumerology(
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
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('professions')
  async getProfessions(@Req() request) {
    const result = await this.numberService.getProfessions(request.user.user_uuid, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.WEAK_QUALITIES_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.WEAK_QUALITIES_GET_RESPONSE,
    type: PageResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('weak-qualities')
  async getNegaiveTraits(@Req() request) {
    const result = await this.numberService.getNegativeTraits(
      request.user.user_uuid,
      request.i18nLang,
    )
    return result
  }

  @ApiOperation({ summary: AppStrings.STRONG_QUALITIES_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.STRONG_QUALITIES_GET_RESPONSE,
    type: PageResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('strong-qualities')
  async getStrongQualitites(@Req() request) {
    const result = await this.numberService.getStrongQualitites(
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
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('planets')
  async getPlanets(@Req() request) {
    const result = await this.numberService.getPlanets(request.user.user_uuid, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.ANCESTORS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.ANCESTORS_GET_RESPONSE,
    type: PageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('ancestors')
  async getAncestors(@Req() request) {
    const result = await this.numberService.getAncestors(request.user.user_uuid, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.TOTEMIC_ANIMALS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.TOTEMIC_ANIMALS_GET_RESPONSE,
    type: PageResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('totemic-animals')
  async getTotemicAnimals(@Req() request) {
    const result = await this.numberService.getTotemicAnimals(
      request.user.user_uuid,
      request.i18nLang,
    )
    return result
  }

  @ApiOperation({ summary: AppStrings.DESTINY_PROGRAM_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.DESTINY_PROGRAM_GET_RESPONSE,
    type: PageResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('destiny-program')
  async getDestinyProgram(@Req() request) {
    const result = await this.numberService.getDestinyProgram(
      request.user.user_uuid,
      request.i18nLang,
    )
    return result
  }

  @ApiOperation({ summary: AppStrings.LUCKY_NUMBERS_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.LUCKY_NUMBERS_GET_RESPONSE,
    type: PageResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('lucky-numbers')
  async getLuckyNumbers(@Req() request) {
    const result = await this.numberService.getLuckyNumbers(request.user.user_uuid)
    return result
  }

  @ApiOperation({ summary: AppStrings.KARMA_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.KARMA_GET_RESPONSE,
    type: PageResponse,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('karma')
  async getKarma(@Req() request) {
    const result = await this.numberService.getKarma(request.user.user_uuid, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.BLOOD_TYPE_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.BLOOD_TYPE_GET_RESPONSE,
    type: PageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('blood-type')
  async getBloodType(@Query('query') bloodType: string, @Req() request) {
    const result = await this.numberService.getBloodType(bloodType, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.ANGELIC_NUMEROLOGY_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.ANGELIC_NUMEROLOGY_GET_RESPONSE,
    type: PageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('angelic-numerology')
  async getAngelicNumerology(@Query('query') time: string, @Req() request) {
    const result = await this.numberService.getAngelicNumerology(time, request.i18nLang)
    return result
  }

  @ApiOperation({ summary: AppStrings.GUESSING_NUMBER_GET_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.GUESSING_NUMBER_GET_RESPONSE,
    type: PageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Get('guessing-number')
  async getGuessingNumber(@Query('query') number: number, @Req() request) {
    if (number > 999999999 || number < 100000000) {
      throw new BadRequestException(this.i18n.t('errors.wrong_guessing_number'))
    }
    const result = await this.numberService.getGuessingNumber(number, request.i18nLang)
    return result
  }
}
