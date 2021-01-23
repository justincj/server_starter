import { Arg, Field, InputType, Mutation, ObjectType } from "type-graphql";
import * as db from "zapatos/db";
import pool from "../config/pgPool";
import * as s from "zapatos/schema";
import { User } from "../graphSchema/user";
import { userInput } from "./userInput";
import { validate } from "../utils/validate";
import argon2 from "argon2";

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  error?: FieldError[];
}

@InputType()
export class usernameOrEmail {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("userInput") userInput: userInput
  ): Promise<s.user.JSONSelectable | UserResponse> {
    const errorResponse = validate(userInput);
    if (errorResponse) {
      return {
        error: errorResponse,
      };
    }

    const passwordHash = await argon2.hash(userInput.password);
    let response;
    try {
      response = await db
        .insert("user", {
          username: userInput.username,
          email: userInput.email,
          password: passwordHash,
        })
        .run(pool);
      console.log(response);
    } catch (e) {
      console.log(e);
      if (e.code === "23505" && e.detail.includes("username")) {
        return {
          error: [{ field: "username", message: "duplicate username" }],
        };
      }
      if (e.code === "23505" && e.detail.includes("email")) {
        return {
          error: [
            {
              field: "email",
              message: "duplicate email",
            },
          ],
        };
      }
    }
    return {
      user: response,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: usernameOrEmail,
    @Arg("password") password: string
  ): Promise<s.user.JSONSelectable | UserResponse> {
    const [user] = await db
      .select(
        "user",
        usernameOrEmail.username
          ? {
              username: usernameOrEmail.username,
            }
          : { email: usernameOrEmail.email }
      )
      .run(pool);
    console.log(user);

    if (!user) {
      return {
        error: [
          {
            field: "usernameOrEmail",
            message: "username or email does not exists",
          },
        ],
      };
    }
    const verify = await argon2.verify(user.password, password);
    if (!verify) {
      return {
        error: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }
    return {
      user,
    };
  }
}
