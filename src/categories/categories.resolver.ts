import {
  Args,
  Context,
  Float,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Category } from './categories.model';
import { CategoryService } from './categories.service';
import { CreateCategoryInput } from './inputs/create-category.input';
import { AuthService } from '../auth/auth.service';
import { Todo } from '../todos/todos.model';
import { TodosService } from '../todos/todos.service';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private categoriesService: CategoryService,
    private authService: AuthService,
    private todoService: TodosService,
  ) {}

  @Query(() => [Category])
  async categories(@Context() context): Promise<Category[]> {
    const userId = await this.authService.getUserIdFromAuthHeader(
      context.req.headers.authorization,
    );
    return this.categoriesService.getAllCategories(userId);
  }

  @ResolveField(() => [Todo])
  todos(@Parent() category: Category) {
    return category.todos;
  }

  @Mutation(() => Category)
  async createCategory(
    @Args('categoryInput') categoryInput: CreateCategoryInput,
    @Context() context,
  ): Promise<Category> {
    const userId = await this.authService.getUserIdFromAuthHeader(
      context.req.headers.authorization,
    );

    return this.categoriesService.createCategory({
      ...categoryInput,
      userId,
    });
  }

  @Mutation(() => Category)
  async deleteCategory(
    @Args('categoryId') categoryId: number,
  ): Promise<Category> {
    return this.categoriesService.deleteCategory(categoryId);
  }
}
