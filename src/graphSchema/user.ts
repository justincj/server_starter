import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  created_at: string;

  @Field(() => String)
  updated_at: string;

  @Field()
  username: string;

  @Field()
  email: string;
}
