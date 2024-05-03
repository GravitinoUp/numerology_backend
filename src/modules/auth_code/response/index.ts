import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'

export class AuthCodeResponse {
  @IsInt()
  @ApiProperty()
  auth_code: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone?: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  email?: string
}

export class StatusAuthCodeResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean
}
