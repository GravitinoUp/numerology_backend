import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsOptional } from 'class-validator'

export class CreatePurchaseDto {
  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  expiration_date?: Date

  @IsDateString()
  @ApiProperty()
  product_sku: string

  @IsDateString()
  @ApiProperty()
  page_uuid: string
}
