import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './messages.model';
import { SaveMessageDto } from './dto/save-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async save(messageDto: SaveMessageDto) {
    // const user = await this.usersRepository.findOne({
    //   where: { id: categoryDto.userId },
    // });
    const message = await this.messagesRepository.save({
      ...messageDto,
      //user,
    });
    //this.appGateway.handleEmit( 'todoEvent', {userEmail: user.email, title: category.title, type: IUserEvents.CREATE_CATEGORY})
    return message;
  }

  async getAllMessages() {
    const messages = await this.messagesRepository.find();
    console.log('asd messages', messages);
    return messages;
  }

  //   async deleteCategory(categoryId: number) {
  //     const deletedCategory: Message = await this.messagesRepository
  //       .createQueryBuilder()
  //       .delete()
  //       .where('id = :id', { id: categoryId })
  //       .returning('*')
  //       .execute()
  //       .then((result) => result.raw[0]);

  //     if (!deletedCategory) {
  //       throw new Error(
  //         `Error when attempt to delete category with id: ${categoryId}.`,
  //       );
  //     }
  //     //this.gateway.handleEmit( 'todoEvent', {userEmail: deletedCategory.user.email , title: deletedCategory.title, type: EUserEvents.DELETE_CATEGORY})
  //     return deletedCategory;
  //   }
}
