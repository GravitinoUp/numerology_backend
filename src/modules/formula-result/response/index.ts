import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsJSON,
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

  @IsJSON()
  @ApiProperty()
  result_name: string

  @IsJSON()
  @ApiProperty()
  result_content: string

  @IsString()
  @ApiProperty()
  result_image: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  formula_name?: string
}

export class StatusFormulaResultResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: FormulaResultResponse
}
