import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsJSON, IsOptional, IsString } from 'class-validator'

export class CategoryResponse {
  @IsInt()
  @ApiProperty()
  category_id: number

  @IsJSON()
  @ApiProperty()
  category_name: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  category_image?: string

  @IsJSON()
  @ApiProperty()
  category_description: string
}

export class StatusCategoryResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: CategoryResponse
}
