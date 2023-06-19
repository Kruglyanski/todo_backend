import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './messages.model';
import { SaveMessageDto } from './dto/save-message.dto';
import { EMessageType } from '../enums/message-type';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async save({message, type, entityTitle, userEmail}: SaveMessageDto) {
    const getMessage = () => {
        const title = entityTitle?.join(' , ')
        switch(type) {
            case EMessageType.CREATE_CATEGORY:{
                return `create category "${title}"`
            }
            case EMessageType.DELETE_CATEGORY:{
                return `delete category "${title}"`
            }
            case EMessageType.CREATE_TODO:{
                return `create todo "${title}"`
            }
            case EMessageType.DELETE_TODO:{
                return `delete todo${entityTitle.length > 1 ? 's' :''} "${title}"`
            }
            case EMessageType.SIGN_IN:{
                return `sign IN`
            }
            case EMessageType.SIGN_OUT:{
                return `sign OUT`
            }
            default: return message;
        }
    } 
    const data = await this.messagesRepository.save({
    type, message: getMessage(), userEmail
    });
        
    return data;
  }

  async getAllMessages() {
    return await this.messagesRepository.find();
  }

    async delete(msgId: number) {
      const deletedMessage: Message = await this.messagesRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id: msgId })
        .returning('*')
        .execute()
        .then((result) => result.raw[0]);

      if (!deletedMessage) {
        throw new Error(
          `Error when attempt to delete message with id: ${msgId}.`,
        );
      }
      
      return deletedMessage;
    }
}
