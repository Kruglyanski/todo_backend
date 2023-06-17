import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [Gateway],
  imports: [AuthModule],
})
export class GatewayModule {}
