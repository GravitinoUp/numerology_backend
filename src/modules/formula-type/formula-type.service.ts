import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { FormulaType } from './entities/formula-type.entity'
import { FormulaTypeResponse, StatusFormulaTypeResponse } from './response'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateFormulaTypeDto } from './dto'

@Injectable()
export class FormulaTypeService {
  constructor(
    @InjectRepository(FormulaType)
    private formulaTypeRepository: Repository<FormulaType>,
  ) {}

  async findAll(language_code: string): Promise<FormulaTypeResponse[]> {
    try {
      const formulaTypes = await this.formulaTypeRepository
        .createQueryBuilder()
        .select()
        .orderBy('formula_type_id', 'ASC')
        .getMany()

      const result = this.formatLocalization(formulaTypes, language_code)
      return result
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(formula_type_id: number, language_code: string): Promise<FormulaTypeResponse> {
    try {
      const formulaType = await this.formulaTypeRepository
        .createQueryBuilder()
        .select()
        .where('formula_type_id = :formula_type_id', {
          formula_type_id,
        })
        .orderBy('formula_type_id', 'ASC')
        .getOne()

      const formattedFormulaType = Object.assign(formulaType, {
        formula_type_name: JSON.parse(formulaType.formula_type_name)[language_code] as string,
        formula_type_description: JSON.parse(formulaType.formula_type_description)[
          language_code
        ] as string,
      })

      return formattedFormulaType
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(formula_type_id: number): Promise<boolean> {
    try {
      const formulaTypeExists = await this.formulaTypeRepository
        .createQueryBuilder()
        .select()
        .where('formula_type_id = :formula_type_id', { formula_type_id })
        .getExists()

      return formulaTypeExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(formulaType: UpdateFormulaTypeDto): Promise<StatusFormulaTypeResponse> {
    try {
      const updateFormulaType = await this.formulaTypeRepository
        .createQueryBuilder()
        .update()
        .set({ ...formulaType })
        .where('formula_type_id = :formula_type_id', {
          formula_type_id: formulaType.formula_type_id,
        })
        .execute()

      if (updateFormulaType.affected != 0) {
        return { status: true }
      } else {
        return { status: false }
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  formatLocalization(data: FormulaType[], language_code: string): FormulaTypeResponse[] {
    const result = []
    for (const object of data) {
      const formattedObject = Object.assign(object, {
        formula_type_name: JSON.parse(object.formula_type_name)[language_code] as string,
        formula_type_description: JSON.parse(object.formula_type_description)[
          language_code
        ] as string,
      })

      result.push(formattedObject)
    }

    return result
  }
}
