import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field()
  title: string;
}
