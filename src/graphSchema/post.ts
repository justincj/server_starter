import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  created_at: string;

  @Field()
  updated_at: string;

  @Field()
  title: string;
}
