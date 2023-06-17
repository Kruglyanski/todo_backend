import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Headers,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryService } from './categories.service';
import { AuthService } from '../auth/auth.service';

@Controller('categories')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(
    @Body() categoryDto: CreateCategoryDto,
    @Headers('authorization') authHeader: string,
  ) {
    const user = await this.authService.getUserFromAuthHeader(authHeader);

    return this.categoryService.createCategory({
      ...categoryDto,
      userId: user.id,
    });
  }

  @Get()
  async getAll(@Headers('authorization') authHeader: string) {
    const user = await this.authService.getUserFromAuthHeader(authHeader);
    return this.categoryService.getAllCategories(user.id);
  }

  @Delete('/:categoryId')
  async delete(@Param('categoryId') categoryId: number) {
    const category = await this.categoryService.deleteCategory(categoryId);
    return category;
  }
}
