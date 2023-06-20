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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './categories.entity';
@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({ status: 200, type: () => Category })
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

  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, type: [Category] })
  @Get()
  async getAll(@Headers('authorization') authHeader: string) {
    const user = await this.authService.getUserFromAuthHeader(authHeader);
    return this.categoryService.getAllCategories(user.id);
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiResponse({ status: 200, type: () => Category })
  @Delete('/:categoryId')
  async delete(@Param('categoryId') categoryId: number) {
    return await this.categoryService.deleteCategory(categoryId);
  }
}
