import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreatePageDto {
  @IsInt()
  @ApiProperty()
  @ApiProperty({ default: 1 })
  page_type_id: number

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  page_keys: string[]

  @IsString()
  @ApiProperty()
  page_name: string

  @IsString()
  @ApiProperty()
  page_image: string

  @IsString()
  @ApiProperty()
  page_content: string

  @IsString()
  @ApiProperty()
  language_code: string
}

export class UpdatePageDto {
  @IsUUID()
  @ApiProperty()
  page_uuid: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ default: 1 })
  page_type_id?: number

  @IsArray()
  @IsOptional()
  @ApiProperty()
  page_keys?: string[]

  @IsString()
  @IsOptional()
  @ApiProperty()
  page_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  page_image?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  page_content?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  language_code?: string
}
