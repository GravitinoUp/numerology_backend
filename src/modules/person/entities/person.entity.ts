import { User } from 'src/modules/user/entities/user.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'People' })
export class Person {
  @PrimaryGeneratedColumn('uuid')
  person_uuid: string

  @Column()
  last_name: string

  @Column()
  first_name: string

  @Column({ nullable: true })
  patronymic: string

  @Column()
  birthday_day: number

  @Column()
  birthday_month: number

  @Column()
  birthday_year: number

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string

  @OneToMany(() => User, (user) => user.person, { cascade: true, eager: true })
  users: User[]
}
