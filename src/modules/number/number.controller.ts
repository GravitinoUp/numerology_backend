import { Controller, Get, HttpStatus, Req, UseFilters, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
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
  constructor(private readonly numberService: NumberService) {}

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
}
