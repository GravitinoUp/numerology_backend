import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUUID, IsOptional, IsInt } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  last_name: string

  @IsString()
  @ApiProperty()
  first_name: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  patronymic?: string

  @IsInt()
  @ApiProperty()
  birthday_day: number

  @IsInt()
  @ApiProperty()
  birthday_month: number

  @IsInt()
  @ApiProperty()
  birthday_year: number

  @IsString()
  @ApiProperty()
  email: string

  @IsString()
  @ApiProperty()
  phone: string

  @IsString()
  @ApiProperty()
  password: string
}

export class UpdateUserDto {
  @IsUUID()
  @ApiProperty()
  user_uuid: string

  @IsString()
  @ApiProperty({ required: false })
  last_name?: string

  @IsString()
  @ApiProperty({ required: false })
  first_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  patronymic?: string

  @IsInt()
  @ApiProperty({ required: false })
  birthday_day?: number

  @IsInt()
  @ApiProperty({ required: false })
  birthday_month?: number

  @IsInt()
  @ApiProperty({ required: false })
  birthday_year?: number

  @IsString()
  @ApiProperty({ required: true })
  password?: string
}
