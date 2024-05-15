import { Module } from '@nestjs/common'
import { FormulaTypeService } from './formula-type.service'
import { FormulaTypeController } from './formula-type.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FormulaType } from './entities/formula-type.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([FormulaType]), UserModule],
  controllers: [FormulaTypeController],
  providers: [FormulaTypeService],
  exports: [FormulaTypeService],
})
export class FormulaTypeModule {}
