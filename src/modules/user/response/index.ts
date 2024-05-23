import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsBoolean, IsInt, IsOptional, IsString, IsUUID } from 'class-validator'

export class UserResponse {
  @IsUUID()
  @ApiProperty()
  user_uuid: string

  @IsString()
  @ApiProperty()
  person_uuid: string

  @IsString()
  @ApiProperty()
  role_id: number

  @IsBoolean()
  @ApiProperty()
  is_active: boolean

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string

  @IsString()
  @ApiProperty()
  phone: string

  @IsString()
  @ApiProperty()
  password: string

  @IsArray()
  @ApiProperty()
  notification_tokens: string[]

  @IsArray()
  @ApiProperty()
  notification_topics: string[]
}

export class ArrayUserResponse {
  @IsInt()
  @ApiProperty()
  count: number

  @IsArray()
  @ApiProperty({ required: false, type: UserResponse, isArray: true })
  data: UserResponse[]
}

export class StatusUserResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean

  @IsOptional()
  @ApiProperty({ required: false })
  data?: UserResponse
}
