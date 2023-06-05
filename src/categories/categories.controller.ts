import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './categories.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  create(@Body() todoDto: CreateCategoryDto) {
    return this.categoryService.createCategory(todoDto);
  }

  @Get()
  getAll() {
    return this.categoryService.getAllCategories();
  }

  @Delete('/:categoryId')
  delete(@Param('categoryId') categoryId: number) {
    return this.categoryService.deleteCategory(categoryId);
  }
}
