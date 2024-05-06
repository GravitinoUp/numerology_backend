import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Page } from './entities/page.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PageResponse } from './response'

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
  ) {}

  async findAll(language_code: string): Promise<PageResponse[]> {
    try {
      const pages = await this.pageRepository
        .createQueryBuilder()
        .select()
        .where('language_code = :language_code', { language_code })
        .getMany()

      return pages
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOneByKey(key: string, type_id: number, language_code: string): Promise<PageResponse> {
    try {
      const page = await this.pageRepository
        .createQueryBuilder('page')
        .select()
        .where('(:key = ANY(page.page_keys)) AND (page.page_type_id = :type_id)', { key, type_id })
        .andWhere('page.language_code = :language_code', { language_code })
        .getOne()

      return page
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAllByKeys(
    keys: string[],
    type_id: number,
    language_code: string,
  ): Promise<PageResponse[]> {
    try {
      const page = await this.pageRepository
        .createQueryBuilder('page')
        .select()
        .where('(:keys && page.page_keys) AND (page.page_type_id = :type_id)', {
          keys,
          type_id,
        })
        .andWhere('page.language_code = :language_code', { language_code })
        .getMany()

      return page
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
