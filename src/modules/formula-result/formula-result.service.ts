import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { FormulaResult } from './entities/formula-result.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormulaResultResponse } from './response'

@Injectable()
export class FormulaResultService {
  constructor(
    @InjectRepository(FormulaResult)
    private formulaResultRepository: Repository<FormulaResult>,
  ) {}

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
}
