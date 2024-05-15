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
  UseFilters,
  UseGuards,
} from '@nestjs/common'
import { LanguageService } from './language.service'
import { LanguageResponse, StatusLanguageResponse } from './response'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AppStrings } from 'src/common/constants/strings'
import { AllExceptionsFilter } from 'src/common/exception.filter'
import { CreateLanguageDto, UpdateLanguageDto } from './dto'
import { JwtAuthGuard } from '../auth/guards/auth.guard'
import { ActiveGuard } from '../auth/guards/active.guard'
import { I18nService } from 'nestjs-i18n'
import { RolesEnum } from 'src/common/constants/constants'
import { Roles } from '../role/guards/decorators/role.decorator'
import { RolesGuard } from '../role/guards/roles.guard'

@ApiBearerAuth()
@ApiTags('Languages')
@Controller('language')
@UseFilters(AllExceptionsFilter)
export class LanguageController {
  constructor(
    private readonly languageService: LanguageService,
    private readonly i18n: I18nService,
  ) {}

  @ApiOperation({ summary: AppStrings.LANGUAGE_CREATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: AppStrings.LANGUAGE_CREATE_RESPONSE,
    type: StatusLanguageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Post()
  async create(@Body() createLanguageDto: CreateLanguageDto) {
    const result = await this.languageService.create(createLanguageDto)
    return result
  }

  @ApiOperation({ summary: AppStrings.LANGUAGE_GET_ALL_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.LANGUAGE_GET_ALL_RESPONSE,
    type: LanguageResponse,
    isArray: true,
  })
  @Get('all')
  async findAll() {
    const result = await this.languageService.findAll()

    return result
  }

  @ApiOperation({ summary: AppStrings.LANGUAGE_UPDATE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.LANGUAGE_UPDATE_RESPONSE,
    type: StatusLanguageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Patch()
  async update(@Body() updateLanguageDto: UpdateLanguageDto) {
    const isLanguageExists = await this.languageService.isLanguageExists(
      updateLanguageDto.language_code,
    )

    if (!isLanguageExists) {
      throw new NotFoundException(await this.i18n.t('errors.language_not_found'))
    }

    const result = await this.languageService.update(updateLanguageDto)
    return result
  }

  @ApiOperation({ summary: AppStrings.LANGUAGE_DELETE_OPERATION })
  @ApiResponse({
    status: HttpStatus.OK,
    description: AppStrings.LANGUAGE_DELETE_RESPONSE,
    type: StatusLanguageResponse,
  })
  @UseGuards(JwtAuthGuard, ActiveGuard, RolesGuard)
  @Roles([RolesEnum.MANAGER, RolesEnum.ADMIN])
  @Delete(':code')
  async delete(@Param('code') language_code: string) {
    const isLanguageExists = await this.languageService.isLanguageExists(language_code)

    if (!isLanguageExists) {
      throw new NotFoundException(await this.i18n.t('errors.language_not_found'))
    }

    const result = await this.languageService.delete(language_code)
    return result
  }
}
