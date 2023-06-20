import { Logger, UnauthorizedException } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { IIncomingData } from '../interfaces/events';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway({ cors: true })
export class Gateway {
  private logger: Logger = new Logger('AppGateway');

  constructor(
    private authService: AuthService,
    private messageService: MessagesService,
  ) {}

  async handleConnection(client: Socket) {
    const messages = await this.messageService.getAllMessages();
    client.emit('clientConnected', messages);
    console.log('clientConnected');
  }

  handleDisconnect(client: Socket) {
    console.log('handleDisconnect');
  }

  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    client: Socket,
    incomingData: IIncomingData<'chatMessage'>,
  ) {
    const token = client.handshake.auth.token;
    const user = await this.authService.getUserFromAuthHeader(token);
    const data = await this.messageService.save({
      ...incomingData,
      userEmail: user.email,
    });

    client.broadcast.emit('chatMessage', data);

    return {
      event: 'chatMessage',
      data,
    };
  }

  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(
    client: Socket,
    msgId: IIncomingData<'deleteMessage'>,
  ) {
    const token = client.handshake.auth.token;
    const user = await this.authService.getUserFromAuthHeader(token);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Incorrect user authorization!!!',
      });
    }

    const deletedMessage = await this.messageService.delete(msgId);
    client.broadcast.emit('deleteMessage', deletedMessage.id);

    return {
      event: 'deleteMessage',
      data: deletedMessage.id,
    };
  }

  @SubscribeMessage('editMessage')
  async handleEditMessage(client: Socket, msg: IIncomingData<'editMessage'>) {
    const token = client.handshake.auth.token;
    const user = await this.authService.getUserFromAuthHeader(token);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Incorrect user authorization!!!',
      });
    }

    const { id, message } = await this.messageService.update(msg);
    client.broadcast.emit('editMessage', { id, message });

    return {
      event: 'editMessage',
      data: { id, message },
    };
  }
}
