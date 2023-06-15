import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('AppGateway INIT.');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('handleConnection');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('handleDisconnect');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    client.broadcast.emit('message', text);

    return { event: 'message', data: text };
  }
}
