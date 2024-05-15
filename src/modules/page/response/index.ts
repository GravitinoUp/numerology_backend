import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class PageResponse {
  @IsUUID()
  @ApiProperty()
  page_uuid: string

  @IsString()
  @ApiProperty()
  page_name: string

  @IsString()
  @ApiProperty()
  page_description: string

  @IsString()
  @ApiProperty()
  page_image: string

  @IsString()
  @ApiProperty()
  page_icon: string

  @IsString()
  @ApiProperty()
  color: string

  @IsString()
  @ApiProperty()
  key: string

  @IsInt()
  @ApiProperty()
  category_id: number

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
