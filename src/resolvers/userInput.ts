import { Field, InputType } from "type-graphql";

@InputType()
export class userInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
