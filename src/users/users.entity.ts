import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../categories/categories.entity';
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

  @ApiProperty({
    example: Category,
    description: 'Array of categories',
    type: () => [Category],
  })
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];
}
