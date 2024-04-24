import { User } from 'src/modules/user/entities/user.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'

@Entity({ name: 'Auths' })
export class Auth {
  @PrimaryGeneratedColumn()
  auth_uuid: string

  @Column()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.user_uuid, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User

  @Column()
  user_agent: string

  @Column()
  ip_address: string

  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
