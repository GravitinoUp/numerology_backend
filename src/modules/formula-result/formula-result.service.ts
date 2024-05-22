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

  async findAll(language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const results = await this.formulaResultRepository
        .createQueryBuilder()
        .select()
        .leftJoinAndSelect('result.formula_type', 'formula_type')
        .where('language_code = :language_code', { language_code })
        .getMany()

      return results
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
        .andWhere('result.language_code = :language_code', { language_code })
        .getOne()

      return formulaResult
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAllByKeys(
    keys: string[],
    type_id: number,
    language_code: string,
  ): Promise<FormulaResultResponse[]> {
    try {
      const result = await this.formulaResultRepository
        .createQueryBuilder('result')
        .select()
        .leftJoinAndSelect('result.formula_type', 'formula_type')
        .where('(:keys && result.result_keys) AND (result.formula_type_id = :type_id)', {
          keys,
          type_id,
        })
        .andWhere('result.language_code = :language_code', { language_code })
        .getMany()

      return result
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAllByType(type_id: number, language_code: string): Promise<FormulaResultResponse[]> {
    try {
      const result = await this.formulaResultRepository
        .createQueryBuilder('result')
        .select()
        .leftJoinAndSelect('result.formula_type', 'formula_type')
        .where('result.formula_type_id = :type_id', {
          type_id,
        })
        .andWhere('result.language_code = :language_code', { language_code })
        .getMany()

      return result
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
}
