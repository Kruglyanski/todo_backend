import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.model';
import { CreateCategoryInput } from './inputs/create-category.input';

interface ICreateCategory
  extends Pick<CreateCategoryInput | CreateCategoryDto, 'title'> {
  userId: number;
}

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createCategory(categoryDto: ICreateCategory) {
    const categoryExist = await this.categoriesRepository.findOne({
      where: { title: categoryDto.title },
    });

    if (categoryExist) {
      throw new BadRequestException('This Category already exists!');
    }

    const user = await this.usersRepository.findOne({
      where: { id: categoryDto.userId },
    });
    const category = await this.categoriesRepository.save({
      ...categoryDto,
      todos: [],
      user,
    });
    //this.appGateway.handleEmit( 'todoEvent', {userEmail: user.email, title: category.title, type: IUserEvents.CREATE_CATEGORY})
    return category;
  }

  async getAllCategories(userId: number) {
    const categories = await this.categoriesRepository.find({
      where: { user: { id: userId } },
      relations: ['todos', 'user'],
    });

    return categories;
  }

  async deleteCategory(categoryId: number) {
    const deletedCategory: Category = await this.categoriesRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id: categoryId })
      .returning('*')
      .execute()
      .then((result) => result.raw[0]);

    if (!deletedCategory) {
      throw new Error(
        `Error when attempt to delete category with id: ${categoryId}.`,
      );
    }
    // this.chatService.handleEmitMessage( 'todoEvent', {userEmail: deletedCategory.user.email , title: deletedCategory.title, type: IUserEvents.DELETE_CATEGORY})
    return deletedCategory;
  }
}
