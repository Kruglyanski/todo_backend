import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@user.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: '123456', description: 'Password' })
  readonly password: string;

  @ApiProperty({ example: '[1, 2, 3]', description: 'Role Ids' })
  readonly roleIds: number[];
}
