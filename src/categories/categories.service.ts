import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/users.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createCategory(categoryDto: CreateCategoryDto) {
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
      user,
    });

    return category;
  }

  async getAllCategories() {
    const categories = await this.categoriesRepository.find({
      relations: ['todos', 'user'],
    });

    return categories;
  }

  async deleteCategory(id: number) {
    const category = await this.categoriesRepository.delete(id);

    return category;
  }
}
