import { ApiProperty } from '@nestjs/swagger'
import BaseModel from 'src/common/model'
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from 'src/modules/user/entities/user.entity'
import { Page } from 'src/modules/page/entities/page.entity'

@Entity({ name: 'Purchases' })
export class Purchase extends BaseModel {
  @PrimaryColumn()
  @ApiProperty()
  purchase_uuid: string

  @Column()
  @ApiProperty()
  user_uuid: string

  @ManyToOne(() => User, (user) => user.user_uuid)
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'user_uuid' })
  @ApiProperty()
  user: User

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  expiration_date?: Date

  @Column()
  @ApiProperty()
  product_sku: string

  @Column()
  @ApiProperty()
  page_uuid: string

  @ManyToOne(() => Page, (page) => page.page_uuid)
  @JoinColumn({ name: 'page_uuid', referencedColumnName: 'page_uuid' })
  @ApiProperty()
  page: Page
}
