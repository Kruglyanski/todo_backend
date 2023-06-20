import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('todos')
export class Todo {
  @ApiProperty({ example: 1, description: 'Identificator' })
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Title', description: 'Title' })
  @Field()
  @Column()
  title: string;

  @ApiProperty({ example: 'Description', description: 'Description' })
  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: 'HIGH', description: 'Tag' })
  @Field({ nullable: true })
  @Column({ nullable: true })
  tag: string;

  @ApiProperty({ example: 'false', description: 'Is Todo Completed' })
  @Field({ nullable: true })
  @Column({ nullable: true })
  completed: boolean;

  @ApiProperty({ example: 1, description: 'CategoryId' })
  @Field({ nullable: true })
  @Column({ nullable: true })
  categoryId: number;

  @ApiProperty({
    example: 'Category',
    description: 'Category',
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.todos, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
