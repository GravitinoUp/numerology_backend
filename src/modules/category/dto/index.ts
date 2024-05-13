import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsInt, IsJSON } from 'class-validator'

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
}
