import { ApiProperty } from '@nestjs/swagger'
import Model from 'src/modules/app/entities/model'
import { User } from 'src/modules/user/entities/user.entity'
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm'

@Entity({ name: 'Roles' })
export class Role extends Model {
  @PrimaryColumn()
  @ApiProperty()
  role_id: number

  @Column()
  @ApiProperty()
  role_name: string

  @OneToMany(() => User, (user) => user.role, { cascade: true, eager: true })
  users: User[]
}
