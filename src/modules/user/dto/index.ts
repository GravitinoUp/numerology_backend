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
  @ApiProperty()
  birthday_day: number

  @IsInt()
  @Min(1)
  @Max(12)
  @ApiProperty()
  birthday_month: number

  @IsInt()
  @Min(1)
  @Max(9999)
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
