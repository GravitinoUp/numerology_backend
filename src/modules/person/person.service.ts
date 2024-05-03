import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Person } from './entities/person.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async getPersonData(person_uuid: string): Promise<Person> {
    try {
      const person = await this.personRepository
        .createQueryBuilder()
        .select()
        .where('person_uuid = :person_uuid', { person_uuid })
        .getOne()

      return person
    } catch (error) {
      throw new HttpException(error.message, error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
