import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ example: 'Todo 1', description: 'Title of todo' })
  readonly title: string;

  @ApiProperty({ example: 'Some text', description: 'Description of todo' })
  readonly description: string;

  @ApiProperty({ example: 'HIGH', description: 'Tag of todo' })
  readonly tag: string;

  @ApiProperty({ example: '13', description: 'Category id' })
  readonly categoryId: number;
}
