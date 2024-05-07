import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

export class PageTypeResponse {
  @IsInt()
  @ApiProperty()
  page_type_id: number

  @IsString()
  @ApiProperty()
  page_type_name: string

  @IsString()
  @ApiProperty()
  page_type_description: string
}

export class StatusPageTypeResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: PageTypeResponse
}
