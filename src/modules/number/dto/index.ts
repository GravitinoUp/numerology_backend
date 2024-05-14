import { ApiProperty } from '@nestjs/swagger'
import { IsDateString } from 'class-validator'

export class GetCompatibilityDto {
  @IsDateString()
  @ApiProperty({ default: '2024-05-14' })
  first_partner_date: Date

  @IsDateString()
  @ApiProperty({ default: '2024-05-14' })
  second_partner_date: Date
}
