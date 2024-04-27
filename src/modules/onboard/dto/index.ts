import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class CreateOnboardDto {
  @IsString()
  @ApiProperty()
  onboard_name: string

  @IsString()
  @ApiProperty()
  onboard_image: string

  @IsString()
  @ApiProperty()
  onboard_description: string

  @IsString()
  @ApiProperty()
  language_code: string
}

export class UpdateOnboardDto {
  @IsInt()
  @ApiProperty()
  onboard_id: number

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  onboard_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  onboard_image?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  onboard_description?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  language_code?: string
}
