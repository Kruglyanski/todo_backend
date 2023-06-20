import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from './categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
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

    return await this.categoriesRepository.save({
      ...categoryDto,
      todos: [],
      user,
    });
  }

  async getAllCategories(userId: number) {
    return await this.categoriesRepository.find({
      where: { user: { id: userId } },
      relations: ['todos', 'user'],
    });
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

    return deletedCategory;
  }
}
