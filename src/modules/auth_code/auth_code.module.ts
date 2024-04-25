import { Module } from '@nestjs/common';
import { AuthCodeService } from './auth_code.service';
import { AuthCodeController } from './auth_code.controller';

@Module({
  controllers: [AuthCodeController],
  providers: [AuthCodeService],
})
export class AuthCodeModule {}
