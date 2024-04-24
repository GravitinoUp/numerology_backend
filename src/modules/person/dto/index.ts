import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class CreatePersonDto {
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
}

export class UpdatePersonDto {
  @IsUUID()
  @ApiProperty()
  person_uuid: string

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
