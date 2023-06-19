import { Injectable, Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { IIncomingData } from '../interfaces/events';
import { MessagesService } from '../messages/messages.service';
@Injectable()
@WebSocketGateway({ cors: true })
export class Gateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private authService: AuthService,
    private messageService: MessagesService,
  ) {
    console.log('Gateway');
  }

  // @WebSocketServer()
  // private server: Server;
  afterInit(server: Server) {
    this.logger.log('AppGateway INIT.');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const messages = await this.messageService.getAllMessages();
    client.emit('clientConnected', { data: messages });
    console.log('handleConnection');
    client.on('disconnecting', async () => {
      console.log('handleConnection client.on disconnecting');
    });
  }

  handleDisconnect(client: Socket) {
    console.log('handleDisconnect', client.id);
  }

  // handleEmit(event: any, data: any) {
  //   console.log('!!!!!!!!!!!!handleEmit', data);
  //   this.server.emit(event, data)
  // }

  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    client: Socket,
    incomingData: IIncomingData<'chatMessage'>,
  ) {
    const token = client.handshake.auth.token;
    const user = await this.authService.getUserFromAuthHeader(token);
    const data = {
      message: incomingData,
      userEmail: user.email,
    };
    this.messageService.save(data);
    client.broadcast.emit('chatMessage', data);

    return {
      event: 'chatMessage',
      data: { message: incomingData, userEmail: user.email },
    };
  }

  @SubscribeMessage('userSign')
  async handleUserSign(
    client: Socket,
    incomingData: IIncomingData<'userSign'>,
  ) {
    const token = client.handshake.auth.token;
    const user = await this.authService.getUserFromAuthHeader(token);
    client.broadcast.emit('userSign', {
      value: incomingData.value,
      userEmail: user.email,
    });

    return {
      event: 'userSign',
      data: { value: incomingData.value, userEmail: user.email },
    };
  }

  @SubscribeMessage('userEvent')
  async handleUserEvent(
    client: Socket,
    incomingData: IIncomingData<'userEvent'>,
  ) {
    const token = client.handshake.auth.token;
    const user = await this.authService.getUserFromAuthHeader(token);
    client.broadcast.emit('userEvent', {
      ...incomingData,
      userEmail: user.email,
    });

    return {
      event: 'userEvent',
      data: { ...incomingData, userEmail: user.email },
    };
  }
}
