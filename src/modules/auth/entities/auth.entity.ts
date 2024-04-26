import { ApiProperty } from '@nestjs/swagger'
import Model from 'src/modules/app/entities/model'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'

@Entity({ name: 'Auths' })
export class Auth extends Model {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  auth_uuid: string

  @Column()
  @ApiProperty()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.user_uuid)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User

  @Column()
  @ApiProperty()
  user_agent: string

  @Column()
  @ApiProperty()
  ip_address: string
}
