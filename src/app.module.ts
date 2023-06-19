import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/categories.module';
import { Category } from './categories/categories.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todos/todos.model';
import { TodosModule } from './todos/todos.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { GraphQLModule } from '@nestjs/graphql';
import { TodosResolver } from './todos/todos.resolver';
import { join } from 'path';
import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { CategoriesResolver } from './categories/categories.resolver';
import { AuthResolver } from './auth/auth.resolver';
import { GatewayModule } from './gateway/gateway.module';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/messages.model';

@Module({
  controllers: [AuthController],
  providers: [JwtAuthGuard, TodosResolver, CategoriesResolver, AuthResolver],
  imports: [
    ConfigModule.forRoot({
      //envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    GraphQLModule.forRoot<YogaDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      driver: YogaDriver,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [User, Role, Todo, Category, Message],
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    TodosModule,
    CategoryModule,
    GatewayModule,
    MessagesModule,
  ],
})
export class AppModule {}
