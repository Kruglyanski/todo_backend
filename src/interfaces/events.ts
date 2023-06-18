import { EUserEvents } from "../enums/user-events";

export interface IOnEvents {
  chatMessage: { message: string };
  userSign: { value: 'in' | 'out'};
  userEvent: { userEvent: EUserEvents, entityTitle: string};
}

export type IIncomingData<T extends keyof IOnEvents> = IOnEvents[T];
