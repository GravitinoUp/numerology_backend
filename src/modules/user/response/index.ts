import { ApiProperty } from '@nestjs/swagger'

export class UserResponse {
  @ApiProperty()
  user_uuid: string

  @ApiProperty()
  person_uuid: string

  @ApiProperty()
  role_id: number

  @ApiProperty()
  is_active: boolean

  @ApiProperty({ required: false })
  email?: string

  @ApiProperty({ required: false })
  phone?: string

  @ApiProperty({ required: false })
  password?: string

  @ApiProperty()
  notification_tokens: string[]

  @ApiProperty()
  notification_topics: string[]
}

export class ArrayUserResponse {
  @ApiProperty()
  count: number

  @ApiProperty({ required: false, type: UserResponse, isArray: true })
  data: UserResponse[]
}

export class StatusUserResponse {
  @ApiProperty()
  status: boolean

  @ApiProperty({ required: false })
  data?: UserResponse
}
