import { ApiProperty } from '@nestjs/swagger';
import { Todo } from '../todos/todos.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/users.model';

@Entity()
export class Category {
  @ApiProperty({ example: 1, description: 'Identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Category 1', description: 'Category title' })
  @Column()
  title: string;

  @ApiProperty({ example: Todo, description: 'Array of todos' })
  @OneToMany(() => Todo, (todo) => todo.category)
  todos: Todo[];

  @ApiProperty({ example: "1", description: 'Category id' })
  @ManyToOne(() => User, (user) => user.categories, {nullable: false, onDelete: 'CASCADE'})
  @JoinColumn({name: 'userId'})
  user: User;
}
