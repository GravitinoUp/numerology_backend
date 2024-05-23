import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator'

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
  @Min(1)
  @Max(31)
  @ApiProperty({ default: 1 })
  birthday_day: number

  @IsInt()
  @Min(1)
  @Max(12)
  @ApiProperty({ default: 1 })
  birthday_month: number

  @IsInt()
  @Min(1)
  @Max(9999)
  @ApiProperty({ default: 2024 })
  birthday_year: number

  @IsString()
  @IsOptional()
  @ApiProperty()
  email?: string

  @IsString()
  @ApiProperty()
  phone: string

  @IsString()
  @ApiProperty()
  password: string

  @IsInt()
  @ApiProperty()
  code: number
}

export class CheckUserExistsDto {
  @IsString()
  @ApiProperty()
  phone: string
}

export class UpdateUserStatusDto {
  @ApiProperty()
  user_uuid: string

  @ApiProperty({ default: true })
  is_active: boolean
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  last_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  first_name?: string

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  patronymic?: string

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  birthday_day?: number

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  birthday_month?: number

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  birthday_year?: number
}

export class UpdateUserPasswordDto {
  @IsString()
  @ApiProperty()
  old_password: string

  @IsString()
  @ApiProperty()
  password: string
}

export class ResetUserPasswordDto {
  @IsInt()
  @ApiProperty()
  code: number

  @IsString()
  @ApiProperty()
  password: string
}
