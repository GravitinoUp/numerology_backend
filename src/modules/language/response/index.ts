import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class LanguageResponse {
  @IsString()
  @ApiProperty()
  language_code: string

  @IsString()
  @ApiProperty()
  language_name: string
}

export class StatusLanguageResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: LanguageResponse
}
