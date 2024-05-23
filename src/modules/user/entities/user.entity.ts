import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Auth } from 'src/modules/auth/entities/auth.entity'
import { Person } from 'src/modules/person/entities/person.entity'
import { Role } from 'src/modules/role/entities/role.entity'
import { Entity, Column, OneToMany, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity({ name: 'Users' })
export class User extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  user_uuid: string

  @Column()
  @ApiProperty()
  person_uuid: string

  @ManyToOne(() => Person, (person) => person.person_uuid)
  @JoinColumn({ name: 'person_uuid', referencedColumnName: 'person_uuid' })
  @ApiProperty()
  person: Person

  @Column()
  @ApiProperty()
  role_id: number

  @ManyToOne(() => Role, (role) => role.role_id)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'role_id' })
  @ApiProperty()
  role: Role

  @Column({ default: true })
  @ApiProperty()
  is_active: boolean

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  email?: string

  @Column()
  @ApiProperty()
  phone: string

  @Column({ select: false })
  @ApiProperty()
  password: string

  @Column({ type: 'varchar', array: true })
  @ApiProperty()
  notification_tokens: string[]

  @Column({ type: 'varchar', array: true })
  @ApiProperty()
  notification_topics: string[]

  @OneToMany(() => Auth, (auth) => auth.user, { cascade: true })
  auths: Auth[]
}
