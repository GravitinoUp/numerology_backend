import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, IsUUID, Length } from 'class-validator'

export class UpdatePageDto {
  @IsUUID()
  @ApiProperty()
  page_uuid: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  page_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  page_description?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  page_image?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  page_icon?: string

  @IsString()
  @Length(6, 6)
  @IsOptional()
  @ApiProperty()
  color?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  key?: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ default: 1 })
  category_id?: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  language_code?: string
}
