import { ApiProperty } from '@nestjs/swagger'
import Model from 'src/modules/app/entities/model'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({ name: 'PageTypes' })
export class PageType extends Model {
  @PrimaryColumn()
  @ApiProperty()
  page_type_id: number

  @Column({ type: 'json' })
  @ApiProperty()
  page_type_name: string

  // @OneToMany(() => User, (user) => user.role, { cascade: true, eager: true })
  // users: User[]
}
