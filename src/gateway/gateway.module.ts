import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { AuthModule } from '../auth/auth.module';
import { MessagesModule } from '../messages/messages.module';

@Module({
  providers: [Gateway],
  imports: [AuthModule, MessagesModule],
  exports: [Gateway],
})
export class GatewayModule {}
