import { Module } from '@nestjs/common'
import { LanguageService } from './language.service'
import { LanguageController } from './language.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Language } from './entities/language.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Language]), UserModule],
  controllers: [LanguageController],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {}
