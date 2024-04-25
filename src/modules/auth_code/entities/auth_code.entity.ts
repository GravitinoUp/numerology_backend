import Model from 'src/modules/app/entities/model'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'AuthCodes' })
export class AuthCode extends Model {
  @PrimaryGeneratedColumn('uuid')
  auth_code_uuid: number

  @Column()
  auth_code: number

  @Column()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.user_uuid)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  user: User
}
