import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsInt } from 'class-validator'

export class CreateFormulaTypeDto {
  @IsString()
  @ApiProperty()
  formula_type_name: string

  @IsString()
  @ApiProperty()
  formula_type_key: string
}

export class UpdateFormulaTypeDto {
  @IsInt()
  @ApiProperty({ default: 1 })
  formula_type_id: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  formula_type_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  formula_type_description?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  formula_type_key?: string
}
