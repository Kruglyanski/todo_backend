import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '../todos/todos.model';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/users.model';
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

  @ApiProperty({ example: Todo, description: 'Array of todos' })
  @OneToMany(() => Todo, (todo) => todo.category)
  todos: Todo[];

  @ApiProperty({ example: User, description: 'User' })
  @ManyToOne(() => User, (user) => user.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
