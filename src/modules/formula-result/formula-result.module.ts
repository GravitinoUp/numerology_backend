import { Module } from '@nestjs/common'
import { FormulaResultService } from './formula-result.service'
import { FormulaResultController } from './formula-result.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FormulaResult } from './entities/formula-result.entity'

@Module({
  imports: [TypeOrmModule.forFeature([FormulaResult])],
  controllers: [FormulaResultController],
  providers: [FormulaResultService],
  exports: [FormulaResultService],
})
export class FormulaResultModule {}
