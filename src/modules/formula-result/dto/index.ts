import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsInt, IsJSON, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreateFormulaResultDto {
  @IsInt()
  @ApiProperty()
  @ApiProperty({ default: 1 })
  formula_type_id: number

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
  @IsOptional()
  @ApiProperty()
  result_image?: string
}

export class UpdateFormulaResultDto {
  @IsUUID()
  @ApiProperty()
  result_uuid: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ default: 1 })
  formula_type_id?: number

  @IsArray()
  @IsOptional()
  @ApiProperty()
  result_keys?: string[]

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  result_name?: string

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  result_content?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  result_image?: string
}
