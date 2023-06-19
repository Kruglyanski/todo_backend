import { EMessageType } from '../enums/message-type';
import { EUserEvents } from '../enums/user-events';

export interface IOnEvents {
  chatMessage: { 
    message?: string; 
    type: EMessageType, 
    entityTitle?: string[];   
  };
  deleteMessage: number;
  userSign: { value: 'in' | 'out' };
  userEvent: { userEvent: EUserEvents; entityTitle: string };
}

export type IIncomingData<T extends keyof IOnEvents> = IOnEvents[T];
