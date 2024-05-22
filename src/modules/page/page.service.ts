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
      const pages = await this.pageRepository.createQueryBuilder().select().getMany()

      const result = await this.formatLocalization(pages, language_code)
      return result
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
        .where('category_id = :category_id', {
          category_id,
        })
        .getMany()

      const result = await this.formatLocalization(pages, language_code)
      return result
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

  formatLocalization(data: Page[], language_code: string): PageResponse[] {
    const result = []
    for (const object of data) {
      const formattedObject = Object.assign(object, {
        page_name: JSON.parse(object.page_name)[language_code] as string,
        page_description: JSON.parse(object.page_description)[language_code] as string,
      })

      result.push(formattedObject)
    }

    return result
  }
}
