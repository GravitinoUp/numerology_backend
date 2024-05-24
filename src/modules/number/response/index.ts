import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class GraphResponse {
  @ApiProperty()
  x_coords: string[]

  @ApiProperty()
  y_coords: string[]

  @IsString()
  @ApiProperty()
  graph_name: string
}
