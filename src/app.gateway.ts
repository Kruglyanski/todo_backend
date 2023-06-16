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

  @WebSocketServer()
  private server: Server;

  afterInit(server: Server) {
    this.logger.log('AppGateway INIT.');
  }

  handleConnection(client: Socket, ...args: any[]) {
    client.emit('clientConnected', {data: 'DATA CONNECTED'});
    this.logger.log('handleConnection');
    client.on('disconnecting', async () => {
        console.log("handleConnection client.on disconnecting")
    })
  }

  handleDisconnect(client: Socket) {
    this.logger.log('handleDisconnect');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, incomingData: any): WsResponse<string> {
    if(incomingData.action === 'chatMessage'){
client.broadcast.emit('chatMessage', incomingData.data);
    
    return { event: 'chatMessage', data:incomingData.data };
    } else if(incomingData.action === 'anotherMessage'){
        client.broadcast.emit('anotherMessage', incomingData.data);
        return { event: 'anotherMessage', data: incomingData.data };
    }
     
  }

//   @SubscribeMessage('anotherMessage')
//   handleAnotherMessage(client: Socket, data: any): WsResponse<any> {
//      client.broadcast.emit('anotherMessage', data);
//     return { event: 'anotherMessage', data };
//   }
}
