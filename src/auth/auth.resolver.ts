import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AllowUnauthorized } from './decorators/allow-unautharized';
import { CreateUserInput } from '../users/inputs/create-user.input';
import { AuthResponse } from './auth-response.entity';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  @AllowUnauthorized()
  async login(
    @Args('userInput') userInput: CreateUserInput,
  ): Promise<AuthResponse> {
    return this.authService.login(userInput);
  }

  @Mutation(() => AuthResponse)
  @AllowUnauthorized()
  async registration(
    @Args('userInput') userInput: CreateUserInput,
  ): Promise<AuthResponse> {
    return this.authService.registration(userInput);
  }
}
