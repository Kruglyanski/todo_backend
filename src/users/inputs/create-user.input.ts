import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  readonly email: string;
  @Field()
  readonly password: string;
  @Field(() => [Int], { nullable: true })
  readonly roleIds: number[];
}
