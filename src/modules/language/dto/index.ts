import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateLanguageDto {
  @IsString()
  @ApiProperty()
  language_code: string

  @IsString()
  @ApiProperty()
  language_name: string
}

export class UpdateLanguageDto {
  @IsString()
  @ApiProperty()
  language_code: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  language_name?: string
}
