import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PageType } from './entities/page_type.entity'
import { PageTypeResponse, StatusPageTypeResponse } from './response'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdatePageTypeDto } from './dto'

@Injectable()
export class PageTypeService {
  constructor(
    @InjectRepository(PageType)
    private pageTypeRepository: Repository<PageType>,
  ) {}

  async findAll(language_code: string): Promise<PageTypeResponse[]> {
    try {
      const pageTypes = await this.pageTypeRepository
        .createQueryBuilder()
        .select()
        .orderBy('page_type_id', 'ASC')
        .getMany()

      const result = []
      for (const pageType of pageTypes) {
        const formattedPageType = Object.assign(pageType, {
          page_type_name: JSON.parse(pageType.page_type_name)[language_code] as string,
          page_type_description: JSON.parse(pageType.page_type_description)[
            language_code
          ] as string,
        })

        result.push(formattedPageType)
      }

      return pageTypes
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(page_type_id: number, language_code: string): Promise<PageTypeResponse> {
    try {
      const pageType = await this.pageTypeRepository
        .createQueryBuilder()
        .select()
        .where('page_type_id = :page_type_id', {
          page_type_id,
        })
        .orderBy('page_type_id', 'ASC')
        .getOne()

      const formattedPageType = Object.assign(pageType, {
        page_type_name: JSON.parse(pageType.page_type_name)[language_code] as string,
        page_type_description: JSON.parse(pageType.page_type_description)[language_code] as string,
      })

      return formattedPageType
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isPageTypeExists(page_type_id: number): Promise<boolean> {
    try {
      const pageTypeExists = await this.pageTypeRepository
        .createQueryBuilder()
        .select()
        .where('page_type_id = :page_type_id', { page_type_id })
        .getExists()

      return pageTypeExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(pageType: UpdatePageTypeDto): Promise<StatusPageTypeResponse> {
    try {
      const updatePageType = await this.pageTypeRepository
        .createQueryBuilder()
        .update()
        .set({ ...pageType })
        .where('page_type_id = :page_type_id', { page_type_id: pageType.page_type_id })
        .execute()

      if (updatePageType.affected != 0) {
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
