import { EMessageType } from "../../enums/message-type";

export class SaveMessageDto {
  readonly message?: string;
  readonly type: EMessageType; 
  readonly entityTitle?: string[];
  readonly userEmail: string;
}
