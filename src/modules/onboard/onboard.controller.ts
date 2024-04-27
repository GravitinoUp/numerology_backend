import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { OnboardService } from './onboard.service'
import { OnboardResponse, StatusOnboardResponse } from './response'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'
import { ActiveGuard } from '../auth/guards/active.guard'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { CreateOnboardDto, UpdateOnboardDto } from './dto'
import { I18nService } from 'nestjs-i18n'
import { AllExceptionsFilter } from 'src/common/exception.filter'

@ApiBearerAuth()
@ApiTags('Onboards')
@Controller('onboard')
@UseFilters(AllExceptionsFilter)
export class OnboardController {
  constructor(
    private readonly onboardService: OnboardService,
    private readonly i18n: I18nService,
  ) {}

  @ApiOperation({ summary: AppStrings.ONBOARD_CREATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.ONBOARD_CREATE_RESPONSE,
    type: StatusOnboardResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Post()
  async create(@Body() createOnboardDto: CreateOnboardDto) {
    const result = await this.onboardService.create(createOnboardDto)
    return result
  }

  @ApiOperation({ summary: AppStrings.ONBOARD_GET_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.ONBOARD_GET_ALL_RESPONSE,
    type: OnboardResponse,
    isArray: true,
  })
  @Get('all')
  async findAll(@Request() request) {
    const result = await this.onboardService.findAll(request.i18nLang) // TODO

    return result
  }

  @ApiOperation({ summary: AppStrings.ONBOARD_UPDATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.ONBOARD_UPDATE_RESPONSE,
    type: StatusOnboardResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Patch()
  async update(@Body() updateOnboardDto: UpdateOnboardDto) {
    const isOnboardExists = await this.onboardService.isExists(updateOnboardDto.onboard_id)

    if (!isOnboardExists) {
      throw new NotFoundException(await this.i18n.t('errors.onboard_not_found'))
    }

    const result = await this.onboardService.update(updateOnboardDto)
    return result
  }

  @ApiOperation({ summary: AppStrings.ONBOARD_DELETE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.ONBOARD_DELETE_RESPONSE,
    type: StatusOnboardResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard)
  @Delete(':id')
  async delete(@Param('id') onboard_id: number) {
    const isOnboardExists = await this.onboardService.isExists(onboard_id)

    if (!isOnboardExists) {
      throw new NotFoundException(await this.i18n.t('errors.onboard_not_found'))
    }

    const result = await this.onboardService.delete(onboard_id)
    return result
  }
}
