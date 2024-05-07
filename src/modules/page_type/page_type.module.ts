import { Module } from '@nestjs/common'
import { PageTypeService } from './page_type.service'
import { PageTypeController } from './page_type.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageType } from './entities/page_type.entity'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([PageType]), UserModule],
  controllers: [PageTypeController],
  providers: [PageTypeService],
  exports: [PageTypeService],
})
export class PageTypeModule {}
