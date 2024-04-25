import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class AuthDto {
  @IsString()
  @ApiProperty({ default: '79000000000' })
  phone: string

  @IsString()
  @ApiProperty()
  password: string
}

export class CreateAuthDto {
  @IsNumber()
  @ApiProperty()
  user_uuid: string

  @IsString()
  @ApiProperty()
  user_agent: string

  @IsString()
  @ApiProperty()
  ip_address: string
}
