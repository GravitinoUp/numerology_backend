import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export default class BaseModel extends BaseEntity {
  @CreateDateColumn()
  created_at: string

  @UpdateDateColumn()
  updated_at: string
}
