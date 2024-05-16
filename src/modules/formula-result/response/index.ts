import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { FormulaType } from 'src/modules/formula-type/entities/formula-type.entity'

export class FormulaResultResponse {
  @IsUUID()
  @ApiProperty()
  result_uuid: string

  @IsInt()
  @ApiProperty({ default: 1 })
  formula_type_id: number

  @ApiProperty()
  formula_type?: FormulaType

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  result_keys: string[]

  @IsString()
  @ApiProperty()
  result_name: string

  @IsString()
  @ApiProperty()
  result_content: string

  @IsString()
  @ApiProperty()
  result_image: string

  @IsString()
  @ApiProperty()
  language_code: string
}

export class StatusFormulaResultResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: FormulaResultResponse
}
