import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '../todos/todos.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Category {
  @ApiProperty({ example: 1, description: 'Identificator' })
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Category 1', description: 'Category title' })
  @Field()
  @Column()
  title: string;

  @ApiProperty({
    example: Todo,
    description: 'Array of todos',
    type: () => [Todo],
  })
  @OneToMany(() => Todo, (todo) => todo.category)
  todos: Todo[];

  @ApiProperty({ example: User, description: 'User', type: () => User })
  @ManyToOne(() => User, (user) => user.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
