import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { FormulaResult } from './entities/formula-result.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormulaResultResponse, StatusFormulaResultResponse } from './response'
import { CreateFormulaResultDto, UpdateFormulaResultDto } from './dto'

@Injectable()
export class FormulaResultService {
  constructor(
    @InjectRepository(FormulaResult)
    private formulaResultRepository: Repository<FormulaResult>,
  ) {}

  async create(formulaResult: CreateFormulaResultDto): Promise<StatusFormulaResultResponse> {
    try {
      const newFormulaResult = await this.formulaResultRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...formulaResult,
        })
        .returning('*')
        .execute()

      return { status: true, data: newFormulaResult.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(
    language_code: string,
    format_names: boolean = true,
  ): Promise<FormulaResultResponse[]> {
    try {
      const results = await this.formulaResultRepository
        .createQueryBuilder()
        .select()
        .leftJoinAndSelect('result.formula_type', 'formula_type')
        .getMany()

      if (format_names == true) {
        const result = this.formatLocalization(results, language_code)
        return result
      } else {
        const result = this.parseLocalization(results)
        return result
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOneByKey(
    key: string,
    type_id: number,
    language_code: string,
  ): Promise<FormulaResultResponse> {
    try {
      const formulaResult = await this.formulaResultRepository
        .createQueryBuilder('result')
        .select()
        .leftJoinAndSelect('result.formula_type', 'formula_type')
        .where('(:key = ANY(result.result_keys)) AND (result.formula_type_id = :type_id)', {
          key,
          type_id,
        })
        .getOne()

      if (formulaResult) {
        const formattedResult = Object.assign(formulaResult, {
          result_name: JSON.parse(formulaResult.result_name)[language_code] as string,
          result_content: JSON.parse(formulaResult.result_content)[language_code] as string,
        })

        return formattedResult
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAllByKeys(
    keys: string[],
    type_id: number,
    language_code: string,
    format_names: boolean = true,
  ): Promise<FormulaResultResponse[]> {
    try {
      const data = await this.formulaResultRepository
        .createQueryBuilder('result')
        .select()
        .leftJoinAndSelect('result.formula_type', 'formula_type')
        .where('(:keys && result.result_keys) AND (result.formula_type_id = :type_id)', {
          keys,
          type_id,
        })
        .getMany()

      if (format_names == true) {
        const result = this.formatLocalization(data, language_code)
        return result
      } else {
        const result = this.parseLocalization(data)
        return result
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAllByType(
    type_id: number,
    language_code: string,
    format_names: boolean = true,
  ): Promise<FormulaResultResponse[]> {
    try {
      const data = await this.formulaResultRepository
        .createQueryBuilder('result')
        .select()
        .leftJoinAndSelect('result.formula_type', 'formula_type')
        .where('result.formula_type_id = :type_id', {
          type_id,
        })
        .getMany()

      if (format_names == true) {
        const result = this.formatLocalization(data, language_code)
        return result
      } else {
        const result = this.parseLocalization(data)
        return result
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isFormulaResultExists(result_uuid: string): Promise<boolean> {
    try {
      const isFormulaResultExists = await this.formulaResultRepository
        .createQueryBuilder()
        .select()
        .where({ result_uuid })
        .getExists()

      return isFormulaResultExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(formulaResult: UpdateFormulaResultDto): Promise<StatusFormulaResultResponse> {
    try {
      const updateFormulaResult = await this.formulaResultRepository
        .createQueryBuilder()
        .update()
        .where({ result_uuid: formulaResult.result_uuid })
        .set({
          ...formulaResult,
        })
        .execute()

      return { status: updateFormulaResult.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(result_uuid: string): Promise<StatusFormulaResultResponse> {
    try {
      const deleteFormulaResult = await this.formulaResultRepository
        .createQueryBuilder()
        .delete()
        .where({ result_uuid })
        .execute()

      return { status: deleteFormulaResult.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  formatLocalization(data: FormulaResult[], language_code: string): FormulaResultResponse[] {
    const result = []
    for (const object of data) {
      const formattedObject = Object.assign(object, {
        result_name: JSON.parse(object.result_name)[language_code] as string,
        result_content: JSON.parse(object.result_content)[language_code] as string,
      })

      result.push(formattedObject)
    }

    return result
  }

  parseLocalization(data: FormulaResult[]): FormulaResultResponse[] {
    const result = []
    for (const object of data) {
      const formattedObject = Object.assign(object, {
        result_name: JSON.parse(object.result_name) as string,
        result_content: JSON.parse(object.result_content) as string,
      })

      result.push(formattedObject)
    }

    return result
  }
}
