import { Module } from '@nestjs/common'
import { NumberService } from './number.service'
import { NumberController } from './number.controller'
import { PersonModule } from '../person/person.module'
import { FormulaResultModule } from '../formula-result/formula-result.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [PersonModule, FormulaResultModule, UserModule],
  controllers: [NumberController],
  providers: [NumberService],
})
export class NumberModule {}
