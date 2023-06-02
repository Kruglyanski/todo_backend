import { ApiProperty } from '@nestjs/swagger';

//import { Role } from '../roles/roles.model';
//import { UserRoles } from '../roles/user-roles.model';
import { Todo } from '../todos/todos.model';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../categories/categories.model';
import { Role } from '../roles/roles.model';


@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'Identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@user.com', description: 'Email' })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({ example: '1234', description: 'Password' })
  @Column({ nullable: false})
  password: string;

  // @ApiProperty({ example: '1', description: 'Role Id' })
  // @Column({ nullable: false})
  // roleId: number;

  // @BelongsToMany(() => Role, () => UserRoles)
  // roles: Role[];

  @ApiProperty({ example: Todo, description: 'Array of categories' })
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({ name: 'user_role' })
  roles: Role[];;
}
