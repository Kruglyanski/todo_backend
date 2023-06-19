import { EMessageType } from '../enums/message-type';

export interface IOnEvents {
  chatMessage: {
    message?: string;
    type: EMessageType;
    entityTitle?: string[];
  };
  editMessage: {
    id: number;
    message: string;
  };
  deleteMessage: number;
}

export type IIncomingData<T extends keyof IOnEvents> = IOnEvents[T];
