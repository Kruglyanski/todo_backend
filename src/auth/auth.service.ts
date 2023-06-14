import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/users.model';
import { CreateUserInput } from '../users/inputs/create-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto | CreateUserInput) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto | CreateUserInput) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User with same email exists!!!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto | CreateUserInput) {
    const user = await this.userService.getUserByEmail(userDto.email);
    let passwordEquals = false;
    if (user) {
      passwordEquals = await bcrypt.compare(userDto.password, user.password);
      if (passwordEquals) {
        return user;
      }
    }
    throw new UnauthorizedException({
      message: 'Incorrect email or password!!!',
    });
  }

  async getUserIdFromAuthHeader(authHeader: string) {
    try {
      const token = authHeader.split(' ')?.[1];
      const payload = this.jwtService.verify(token);
      return payload.id;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'Something went wrong',
        error,
      });
    }
  }
}
