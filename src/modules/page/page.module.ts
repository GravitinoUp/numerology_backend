import { Module } from '@nestjs/common'
import { PageService } from './page.service'
import { PageController } from './page.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Page } from './entities/page.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Page]), UserModule],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
