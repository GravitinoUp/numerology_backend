import { Auth } from 'src/modules/auth/entities/auth.entity'
import { Person } from 'src/modules/person/entities/person.entity'
import { Role } from 'src/modules/role/entities/role.entity'
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'

@Entity({ name: 'Users' })
export class User {
  @PrimaryColumn()
  user_uuid: string

  @Column()
  person_uuid: string

  person: Person

  @Column()
  role_id: number

  role: Role

  @Column({ default: true })
  is_active: boolean

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string

  @OneToMany(() => Auth, (auth) => auth.user, { cascade: true, eager: true })
  auths: Auth[]
}
