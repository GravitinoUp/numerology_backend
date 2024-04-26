import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsInt, IsOptional, IsPhoneNumber } from 'class-validator'

export class SendPhoneAuthCodeDto {
  @IsPhoneNumber()
  @ApiProperty({ default: '+79000000000' })
  phone: string
}

export class SendEmailAuthCodeDto {
  @IsEmail()
  @ApiProperty({ default: 'user1@mail.com' })
  email: string
}

export class CreateAuthCodeDto {
  @IsInt()
  @ApiProperty()
  auth_code: number

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty()
  phone?: string

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email?: string
}
