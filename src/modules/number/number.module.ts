import { Module } from '@nestjs/common'
import { NumberService } from './number.service'
import { NumberController } from './number.controller'

@Module({
  imports: [],
  controllers: [NumberController],
  providers: [NumberService],
})
export class NumberModule {}
