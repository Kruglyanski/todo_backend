// import { Injectable, Logger } from '@nestjs/common';
// import {
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
//   WsResponse,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { UsersService } from './users/users.service';
// import { AuthService } from './auth/auth.service';
// import { IIncomingData } from './interfaces/events';

// @WebSocketGateway({ cors: true })
// export class AppGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   private logger: Logger = new Logger('AppGateway');
//   constructor(private authService: AuthService) {}

//   @WebSocketServer()
//   private server: Server;

//   afterInit(server: Server) {
//     this.logger.log('AppGateway INIT.');
//   }

//   handleConnection(client: Socket, ...args: any[]) {
//     client.emit('clientConnected', { data: 'DATA CONNECTED' });
//     this.logger.log('handleConnection');
//     client.on('disconnecting', async () => {
//       console.log('handleConnection client.on disconnecting');
//     });
//   }

//   handleDisconnect(client: Socket) {
//     console.log('handleDisconnect', client.id);
//   }

//   handleEmit(event: any, data: any) {
//     console.log('!!!!!!!!!!!!handleEmit', data);
//     // this.server.emit(event, data)
//   }

//   @SubscribeMessage('message')
//   async handleMessage(client: Socket, incomingData: IIncomingData) {
//     const token = client.handshake.auth.token;
//     const user = await this.authService.getUserFromAuthHeader(token);

//     if (incomingData.action === 'chatMessage') {
//       client.broadcast.emit('chatMessage', {
//         message: incomingData.data,
//         userEmail: user.email,
//       });
//       return {
//         event: 'chatMessage',
//         data: { message: incomingData.data, userEmail: user.email },
//       };
//     } else if (incomingData.action === 'anotherMessage') {
//       client.broadcast.emit('anotherMessage', incomingData.data);
//       return {
//         event: 'anotherMessage',
//         data: { message: 'test', userEmail: user.email },
//       };
//     }
//   }
// }
