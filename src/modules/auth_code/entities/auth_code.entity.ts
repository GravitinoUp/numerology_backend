import Model from 'src/modules/app/entities/model'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'AuthCodes' })
export class AuthCode extends Model {
  @PrimaryGeneratedColumn('uuid')
  auth_code_uuid: number

  @Column()
  auth_code: number

  @Column()
  phone?: string

  @Column()
  email?: string
}
