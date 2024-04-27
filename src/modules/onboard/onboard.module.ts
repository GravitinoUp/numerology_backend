import { Module } from '@nestjs/common'
import { OnboardService } from './onboard.service'
import { OnboardController } from './onboard.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Onboard } from './entities/onboard.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Onboard]), UserModule],
  controllers: [OnboardController],
  providers: [OnboardService],
})
export class OnboardModule {}
