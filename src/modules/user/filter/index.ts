import { ApiProperty } from '@nestjs/swagger'
import { FilterOffset } from 'src/common/classes/filter_offset'
import { AppStrings } from 'src/common/constants/strings'

export class UserSorts {
  @ApiProperty({ default: AppStrings.ASC, required: false })
  user_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  person_uuid?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  role_id?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  is_active?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  email?: 'ASC' | 'DESC'

  @ApiProperty({ default: AppStrings.ASC, required: false })
  phone?: 'ASC' | 'DESC'
}

export class UserFilters {
  @ApiProperty({ required: false })
  user_uuid?: string

  @ApiProperty({ required: false })
  person_uuid?: string

  @ApiProperty({ required: false })
  role_id?: number

  @ApiProperty({ required: false })
  is_active?: boolean

  @ApiProperty({ required: false })
  email?: string

  @ApiProperty({ required: false })
  phone?: string
}

export class UserFilter {
  @ApiProperty({ required: false })
  offset?: FilterOffset

  @ApiProperty({ required: false })
  filter?: UserFilters

  @ApiProperty({ required: false })
  sorts?: UserSorts
}
