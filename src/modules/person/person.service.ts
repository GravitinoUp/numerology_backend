import { Injectable } from '@nestjs/common'
import { CreatePersonDto, UpdatePersonDto } from './dto'
import { Person } from './entities/person.entity'

@Injectable()
export class PersonService {
  create(createPersonDto: CreatePersonDto) {}

  findAll() {
    return `This action returns all person`
  }

  findOne(id: number) {
    return `This action returns a #${id} person`
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return `This action updates a #${id} person`
  }

  remove(id: number) {
    return `This action removes a #${id} person`
  }
}
