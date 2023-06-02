import { BadRequestException, Injectable } from '@nestjs/common';
import { Category } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';
// import { Todo } from '../todos/todos.model';
// import { User } from '../users/users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) 
    private categoriesRepository: Repository<Category>,
  ) {}

   async createCategory(categoryDto: CreateCategoryDto) {

    const categoryExist = await this.categoriesRepository.findOne({where: {title: categoryDto.title}})
    
    if(categoryExist) {
      throw new BadRequestException('This Category already exists!')
    }

    const category = this.categoriesRepository.save(categoryDto);

    return category;
  }

  async getAllCategories() {
    const categories = await this.categoriesRepository.find({ relations: ['todos', 'user'] });

    return categories;
  }

  async deleteCategory(id: number) {
    const category = await this.categoriesRepository.delete(id);

    return category;
  }

}
