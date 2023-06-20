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
import { Category } from './categories.entity';
import { CategoryService } from './categories.service';
import { CreateCategoryInput } from './inputs/create-category.input';
import { AuthService } from '../auth/auth.service';
import { Todo } from '../todos/todos.entity';
import { TodosService } from '../todos/todos.service';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(
    private categoriesService: CategoryService,
    private authService: AuthService,
  ) {}

  @Query(() => [Category])
  async categories(@Context() context): Promise<Category[]> {
    console.log(
      'context.req.headers.authorization',
      context.req.headers.authorization,
    );
    const user = await this.authService.getUserFromAuthHeader(
      context.req.headers.authorization,
    );
    return this.categoriesService.getAllCategories(user.id);
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
    const user = await this.authService.getUserFromAuthHeader(
      context.req.headers.authorization,
    );

    return this.categoriesService.createCategory({
      ...categoryInput,
      userId: user.id,
    });
  }

  @Mutation(() => Category)
  async deleteCategory(
    @Args('categoryId') categoryId: number,
  ): Promise<Category> {
    return this.categoriesService.deleteCategory(categoryId);
  }
}
