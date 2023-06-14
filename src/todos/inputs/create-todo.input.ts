import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  readonly title: string;
  @Field({ nullable: true })
  readonly description: string;
  @Field()
  readonly categoryId: number;
  @Field({ nullable: true })
  readonly tag: string;
}
