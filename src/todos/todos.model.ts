import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../categories/categories.model';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@Entity()
export class Todo {
  @ApiProperty({ example: 1, description: 'Identificator' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Title', description: 'Title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Description', description: 'Description' })
  @Column()
  description: string;

  @ApiProperty({ example: 'HIGH', description: 'Tag' })
  @Column({
    nullable: true,
  })
  tag: string;

  @ApiProperty({ example: 'false', description: 'Is Todo Complelted' })
  @Column({
    nullable: true,
  })
  completed: boolean;

  // @ForeignKey(() => User)
  // @Column({ type: DataType.INTEGER })
  // userId: number;
  @ApiProperty({ example: '1', description: 'Category id' })
  @ManyToOne(() => Category, (category) => category.todos, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  // @BelongsTo(() => User)
  // appointedUser: User;
}
