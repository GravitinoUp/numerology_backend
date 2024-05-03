import { Module } from '@nestjs/common'
import { NumberService } from './number.service'
import { NumberController } from './number.controller'
import { PersonModule } from '../person/person.module'
import { PageModule } from '../page/page.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [PersonModule, PageModule, UserModule],
  controllers: [NumberController],
  providers: [NumberService],
})
export class NumberModule {}
