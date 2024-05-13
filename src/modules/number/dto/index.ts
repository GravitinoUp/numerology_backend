import { ApiProperty } from '@nestjs/swagger'
import { IsDate } from 'class-validator'

export class GetCompatibilityDto {
  @IsDate()
  @ApiProperty()
  first_partner_date: Date

  @IsDate()
  @ApiProperty()
  second_partner_date: Date
}
