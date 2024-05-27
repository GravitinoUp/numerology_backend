import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Category } from './entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { UpdateCategoryDto, UpdateCategoryStatusDto } from './dto'
import { CategoryResponse, StatusCategoryResponse } from './response'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private dataSource: DataSource,
  ) {}

  async findAll(language_code: string, format_names: boolean = true): Promise<CategoryResponse[]> {
    try {
      const categories = await this.categoryRepository
        .createQueryBuilder()
        .select()
        .orderBy('position', 'ASC')
        .getMany()

      if (format_names == true) {
        const result = this.formatLocalization(categories, language_code)
        return result
      } else {
        const result = this.parseLocalization(categories)
        return result
      }
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

  async updateStatus(data: UpdateCategoryStatusDto): Promise<StatusCategoryResponse> {
    try {
      const updateUser = await this.categoryRepository
        .createQueryBuilder()
        .update()
        .set({ is_active: data.is_active })
        .where({ category_id: data.category_id })
        .execute()

      if (updateUser.affected > 0) {
        return { status: true }
      } else {
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(category: UpdateCategoryDto): Promise<StatusCategoryResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()

    await queryRunner.startTransaction()
    try {
      if (
        category.position &&
        category.old_position &&
        category.position != category.old_position
      ) {
        const categories = await queryRunner.manager
          .getRepository(Category)
          .createQueryBuilder('category')
          .useTransaction(false)
          .select(['category.category_id', 'category.position'])
          .orderBy('category.position', 'ASC')
          .getMany()

        const isMovedToTop = category.position > category.old_position
        for (
          let index = category.position;
          isMovedToTop ? index >= category.old_position : index <= category.old_position;
          isMovedToTop ? index-- : index++
        ) {
          await queryRunner.manager
            .getRepository(Category)
            .createQueryBuilder()
            .useTransaction(true)
            .update()
            .set({
              position:
                category.old_position == index
                  ? category.position
                  : isMovedToTop
                    ? index - 1
                    : index + 1,
            })
            .where({ category_id: categories[index - 1].category_id })
            .execute()
        }
      }

      delete category['old_position']
      const updateCategory = await queryRunner.manager
        .getRepository(Category)
        .createQueryBuilder()
        .useTransaction(true)
        .update()
        .set({ ...category })
        .where('category_id = :category_id', { category_id: category.category_id })
        .execute()

      if (updateCategory.affected != 0) {
        await queryRunner.commitTransaction()
        return { status: true }
      } else {
        await queryRunner.rollbackTransaction()
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    } finally {
      await queryRunner.release()
    }
  }

  formatLocalization(data: Category[], language_code: string): CategoryResponse[] {
    const result = []
    for (const object of data) {
      const formattedObject = Object.assign(object, {
        category_name: JSON.parse(object.category_name)[language_code] as string,
        category_description: JSON.parse(object.category_description)[language_code] as string,
      })

      result.push(formattedObject)
    }

    return result
  }

  parseLocalization(data: Category[]): CategoryResponse[] {
    const result = []
    for (const object of data) {
      const formattedObject = Object.assign(object, {
        category_name: JSON.parse(object.category_name) as string,
        category_description: JSON.parse(object.category_description) as string,
      })

      result.push(formattedObject)
    }

    return result
  }
}
