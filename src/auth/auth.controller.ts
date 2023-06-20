import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AllowUnauthorized } from './decorators/allow-unautharized';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @AllowUnauthorized()
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @AllowUnauthorized()
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
