import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Category } from './entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateCategoryDto } from './dto'
import { CategoryResponse, StatusCategoryResponse } from './response'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(language_code: string): Promise<CategoryResponse[]> {
    try {
      const categories = await this.categoryRepository
        .createQueryBuilder()
        .select()
        .orderBy('category_id', 'ASC')
        .getMany()

      const result = []
      for (const category of categories) {
        const formattedCategory = Object.assign(category, {
          category_name: JSON.parse(category.category_name)[language_code] as string,
          category_description: JSON.parse(category.category_description)[language_code] as string,
        })

        result.push(formattedCategory)
      }

      return result
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isCategoryExists(category_id: number): Promise<boolean> {
    try {
      const categoryExists = await this.categoryRepository
        .createQueryBuilder()
        .select()
        .where('category_id = :category_id', { category_id })
        .getExists()

      return categoryExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(category: UpdateCategoryDto): Promise<StatusCategoryResponse> {
    try {
      const updatePageType = await this.categoryRepository
        .createQueryBuilder()
        .update()
        .set({ ...category })
        .where('category_id = :category_id', { category_id: category.category_id })
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
