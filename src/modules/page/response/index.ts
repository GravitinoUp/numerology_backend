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

export class PageResponse {
  @IsUUID()
  @ApiProperty()
  page_uuid: string

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
  @IsOptional()
  @ApiProperty()
  page_title?: string

  @IsString()
  @ApiProperty()
  language_code: string
}

export class StatusPageResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: PageResponse
}
