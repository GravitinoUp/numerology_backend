import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsInt } from 'class-validator'

export class CreatePageTypeDto {
  @IsString()
  @ApiProperty()
  page_type_name: string
}

export class UpdatePageTypeDto {
  @IsInt()
  @ApiProperty({ default: 1 })
  page_type_id: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  page_type_name?: string
}
