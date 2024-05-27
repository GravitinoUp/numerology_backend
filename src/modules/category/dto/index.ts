import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsInt, IsJSON, IsBoolean } from 'class-validator'

export class CreateCategoryDto {
  @IsJSON()
  @ApiProperty()
  category_name: string

  @IsJSON()
  @ApiProperty()
  category_description: string

  @IsString()
  @ApiProperty()
  category_image: string

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  is_active?: boolean

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, default: null })
  position?: number
}

export class UpdateCategoryDto {
  @IsInt()
  @ApiProperty()
  category_id: number

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  category_name?: string

  @IsJSON()
  @IsOptional()
  @ApiProperty()
  category_description?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  category_image?: string

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: true })
  is_active?: boolean

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false, default: null })
  position?: number
}

export class UpdateCategoryStatusDto {
  @IsInt()
  @ApiProperty()
  category_id: number

  @IsBoolean()
  @ApiProperty({ default: true })
  is_active: boolean
}
