import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Onboard } from './entities/onboard.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateOnboardDto, UpdateOnboardDto } from './dto'
import { OnboardResponse, StatusOnboardResponse } from './response'

@Injectable()
export class OnboardService {
  constructor(
    @InjectRepository(Onboard)
    private onboardRepository: Repository<Onboard>,
  ) {}

  async create(onboard: CreateOnboardDto): Promise<StatusOnboardResponse> {
    try {
      const newOnboard = await this.onboardRepository
        .createQueryBuilder()
        .insert()
        .values({
          ...onboard,
        })
        .returning('*')
        .execute()

      return { status: true, data: newOnboard.raw[0] }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(language_code: string): Promise<OnboardResponse[]> {
    try {
      const onboards = await this.onboardRepository
        .createQueryBuilder()
        .select()
        .where('language_code = :language_code', { language_code })
        .getMany()

      return onboards
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async isExists(onboard_id: number): Promise<boolean> {
    try {
      const isLanguageExists = await this.onboardRepository
        .createQueryBuilder()
        .select()
        .where('onboard_id =:onboard_id', { onboard_id })
        .getExists()

      return isLanguageExists
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(onboard: UpdateOnboardDto): Promise<StatusOnboardResponse> {
    try {
      const updateOnboard = await this.onboardRepository
        .createQueryBuilder()
        .update()
        .where('onboard_id = :onboard_id', { onboard_id: onboard.onboard_id })
        .set({
          ...onboard,
        })
        .execute()

      return { status: updateOnboard.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(onboard_id: number): Promise<StatusOnboardResponse> {
    try {
      const deleteOnboard = await this.onboardRepository
        .createQueryBuilder()
        .delete()
        .where('onboard_id = :onboard_id', { onboard_id })
        .execute()

      return { status: deleteOnboard.affected !== 0 }
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
