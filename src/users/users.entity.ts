import { ApiProperty } from '@nestjs/swagger';

//import { Role } from '../roles/roles.model';
//import { UserRoles } from '../roles/user-roles.model';
import { Todo } from '../todos/todos.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Role } from '../roles/roles.entity';
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'Identificator' })
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@user.com', description: 'Email' })
  @Field()
  @Column({ nullable: false })
  email: string;

  @ApiProperty({ example: '1234', description: 'Password' })
  @Field()
  @Column({ nullable: false })
  password: string;

  // @ApiProperty({ example: '1', description: 'Role Id' })
  // @Column({ nullable: false})
  // roleId: number;

  // @BelongsToMany(() => Role, () => UserRoles)
  // roles: Role[];

  @ApiProperty({ example: Category, description: 'Array of categories' })
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: 'user_role' })
  roles: Role[];
}
