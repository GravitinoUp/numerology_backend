import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PageType } from './entities/page_type.entity'
import { PageTypeResponse } from './response'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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
        })

        result.push(formattedPageType)
      }

      return pageTypes
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
