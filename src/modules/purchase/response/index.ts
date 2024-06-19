import { ApiProperty } from '@nestjs/swagger'
import { PageResponse } from 'src/modules/page/response'
import { UserResponse } from 'src/modules/user/response'

export class PurchaseResponse {
  @ApiProperty()
  purchase_uuid: string

  @ApiProperty()
  user_uuid: string

  @ApiProperty({ required: false })
  user?: UserResponse

  @ApiProperty({ required: false })
  expiration_date?: Date

  @ApiProperty()
  product_sku: string

  @ApiProperty()
  page_uuid: string

  @ApiProperty({ required: false })
  page?: PageResponse
}

export class StatusPurchaseResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: PurchaseResponse
}
