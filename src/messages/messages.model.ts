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

// @ObjectType()
@Entity()
export class Message {
  //   @Field()
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  //   @Field()
  message: string;
  @Column()
  //   @Field()
  userEmail: string;

  //   @ApiProperty({ example: User, description: 'User' })
  //   @ManyToOne(() => User, (user) => user.categories, {
  //     onDelete: 'CASCADE',
  //   })
  //   @JoinColumn({ name: 'userId' })
  //   user: User;
}