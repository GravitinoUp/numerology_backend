import BaseModel from 'src/common/model'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'AuthCodes' })
export class AuthCode extends BaseModel {
  @PrimaryGeneratedColumn('uuid')
  auth_code_uuid: number

  @Column()
  auth_code: number

  @Column()
  phone?: string

  @Column()
  email?: string
}
