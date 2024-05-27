import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsJSON, IsOptional, IsString, IsUUID, Length } from 'class-validator'

export class UpdatePageDto {
  @IsUUID()
  @ApiProperty()
  page_uuid: string

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  page_name?: string

  @IsJSON()
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
  @Length(7, 7)
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

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: true })
  is_active?: boolean

  @IsInt()
  @IsOptional()
  @ApiProperty({ default: null })
  position?: number
}

export class UpdatePageStatusDto {
  @IsUUID()
  @ApiProperty()
  page_uuid: string

  @IsBoolean()
  @ApiProperty({ default: true })
  is_active: boolean
}
