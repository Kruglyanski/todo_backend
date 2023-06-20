import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @ApiProperty({ example: 1, description: 'Identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Admin', description: 'Role' })
  @Column({ nullable: false })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Role description' })
  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  @JoinTable({ name: 'user_role' })
  users: User[];
}
