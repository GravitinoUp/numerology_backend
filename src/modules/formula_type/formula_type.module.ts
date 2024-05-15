import { Module } from '@nestjs/common'
import { FormulaTypeService } from './formula_type.service'
import { FormulaTypeController } from './formula_type.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FormulaType } from './entities/formula_type.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([FormulaType]), UserModule],
  controllers: [FormulaTypeController],
  providers: [FormulaTypeService],
  exports: [FormulaTypeService],
})
export class FormulaTypeModule {}
