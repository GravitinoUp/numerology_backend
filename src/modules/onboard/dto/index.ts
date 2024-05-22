import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsJSON, IsOptional, IsString } from 'class-validator'

export class CreateOnboardDto {
  @IsJSON()
  @ApiProperty()
  onboard_name: string

  @IsString()
  @ApiProperty()
  onboard_image: string

  @IsJSON()
  @ApiProperty()
  onboard_description: string
}

export class UpdateOnboardDto {
  @IsInt()
  @ApiProperty()
  onboard_id: number

  @IsJSON()
  @IsOptional()
  @ApiProperty({ required: false })
  onboard_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  onboard_image?: string

  @IsJSON()
  @IsOptional()
  @ApiProperty({ required: false })
  onboard_description?: string
}
