import { User } from 'src/modules/user/entities/user.entity'
import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm'

@Entity({ name: 'Roles' })
export class Role {
  @PrimaryColumn()
  role_id: number

  @Column()
  role_name: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string

  @OneToMany(() => User, (user) => user.role, { cascade: true, eager: true })
  users: User[]
}
