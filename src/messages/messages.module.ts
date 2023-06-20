import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './messages.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [MessagesService],
  imports: [TypeOrmModule.forFeature([Message])],
  exports: [MessagesService],
})
export class MessagesModule {}
