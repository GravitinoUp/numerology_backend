import { Module } from '@nestjs/common'
import { AuthCodeService } from './auth_code.service'
import { AuthCodeController } from './auth_code.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthCode } from './entities/auth_code.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AuthCode])],
  controllers: [AuthCodeController],
  providers: [AuthCodeService],
  exports: [AuthCodeService],
})
export class AuthCodeModule {}
