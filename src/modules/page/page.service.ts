import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Page } from './entities/page.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PageResponse, StatusPageResponse } from './response'
import { UpdatePageDto } from './dto'

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
        .where('language_code = :language_code', {
          language_code,
        })
        .getMany()

      return pages
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findByCategory(category_id: number, language_code: string): Promise<PageResponse[]> {
    try {
      const pages = await this.pageRepository
        .createQueryBuilder()
        .select()
        .where('language_code = :language_code AND category_id = :category_id', {
          language_code,
          category_id,
        })
        .getMany()

      return pages
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(page_uuid: string): Promise<boolean> {
    try {
      const pageExists = await this.pageRepository
        .createQueryBuilder()
        .select()
        .where('page_uuid = :page_uuid', { page_uuid })
        .getExists()

      return pageExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(page: UpdatePageDto): Promise<StatusPageResponse> {
    try {
      const updatePage = await this.pageRepository
        .createQueryBuilder()
        .update()
        .set({ ...page })
        .where('page_uuid = :page_uuid', { page_uuid: page.page_uuid })
        .execute()

      if (updatePage.affected != 0) {
        return { status: true }
      } else {
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
