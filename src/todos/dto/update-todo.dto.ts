import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({ example: 'false', description: 'Status of completion' })
  readonly completed: boolean;
}
