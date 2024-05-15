import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

export class FormulaTypeResponse {
  @IsInt()
  @ApiProperty()
  formula_type_id: number

  @IsString()
  @ApiProperty()
  formula_type_name: string

  @IsString()
  @ApiProperty()
  formula_type_description: string
}

export class StatusFormulaTypeResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: FormulaTypeResponse
}
