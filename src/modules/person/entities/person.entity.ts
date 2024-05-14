import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity({ name: 'People' })
export class Person extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  person_uuid: string

  @Column()
  @ApiProperty()
  last_name: string

  @Column()
  @ApiProperty()
  first_name: string

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  patronymic?: string

  @Column()
  @ApiProperty()
  birthday_day: number

  @Column()
  @ApiProperty()
  birthday_month: number

  @Column()
  @ApiProperty()
  birthday_year: number

  @OneToMany(() => User, (user) => user.person, { cascade: true, eager: true })
  users: User[]
}
