import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [Gateway],
  imports: [AuthModule],
  exports: [Gateway]
})
export class GatewayModule {}
