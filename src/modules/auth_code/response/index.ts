import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'

export class StatusAuthCodeResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean
}
