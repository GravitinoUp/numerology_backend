import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsPhoneNumber, IsUUID } from 'class-validator'

export class SendPhoneAuthCodeDto {
  @IsInt()
  @ApiProperty()
  auth_code: number

  @IsPhoneNumber()
  @ApiProperty()
  phone: string
}

export class CreateAuthCodeDto {
  @IsInt()
  @ApiProperty()
  auth_code: number

  @IsUUID()
  @ApiProperty()
  user_uuid: string
}
