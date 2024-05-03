import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Language } from './entities/language.entity'
import { CreateLanguageDto, UpdateLanguageDto } from './dto'
import { LanguageResponse, StatusLanguageResponse } from './response'

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async create(language: CreateLanguageDto): Promise<StatusLanguageResponse> {
    try {
      const newLanguage = await this.languageRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...language,
        })
        .returning('*')
        .execute()

      return { status: true, data: newLanguage.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<LanguageResponse[]> {
    try {
      const languages = await this.languageRepository.createQueryBuilder().select().getMany()

      return languages
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isLanguageExists(language_code: string): Promise<boolean> {
    try {
      const isLanguageExists = await this.languageRepository
        .createQueryBuilder()
        .select()
        .where('language_code =:language_code', { language_code })
        .getExists()

      return isLanguageExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(language: UpdateLanguageDto): Promise<StatusLanguageResponse> {
    try {
      const updateLanguage = await this.languageRepository
        .createQueryBuilder()
        .update()
        .where('language_code = :language_code', { language_code: language.language_code })
        .set({
          ...language,
        })
        .execute()

      return { status: updateLanguage.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(language_code: string): Promise<StatusLanguageResponse> {
    try {
      const deleteLanguage = await this.languageRepository
        .createQueryBuilder()
        .delete()
        .where('language_code = :language_code', { language_code })
        .execute()

      return { status: deleteLanguage.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
