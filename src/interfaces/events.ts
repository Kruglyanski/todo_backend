export interface IOnEvents {
  chatMessage: { message: string; userEmail: string };
  anotherMessage: { text: string; foo: any };
}

export interface IIncomingData {
  action: keyof IOnEvents;
  data: IOnEvents[keyof IOnEvents];
}
