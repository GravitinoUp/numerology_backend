import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { FormulaResultResponse } from 'src/modules/formula-result/response'

export class GraphResponse {
  @ApiProperty()
  x_coords: string[]

  @ApiProperty()
  y_coords: string[]

  @IsString()
  @ApiProperty()
  graph_name: string
}

export class GraphDataResponse {
  @ApiProperty()
  graphs: GraphResponse[]

  @ApiProperty()
  results: FormulaResultResponse[]
}
