import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

export class OnboardResponse {
  @IsInt()
  @ApiProperty()
  onboard_id: number

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

export class StatusOnboardResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: OnboardResponse
}
