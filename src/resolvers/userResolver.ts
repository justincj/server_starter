import { v4 } from "uuid";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
} from "type-graphql";
import * as db from "zapatos/db";
import pool from "../config/pgPool";
import * as s from "zapatos/schema";
import { User } from "../graphSchema/user";
import { userInput } from "./userInput";
import { validate } from "../utils/validate";
import argon2 from "argon2";
import { MyContext } from "../types";
import { sendMail } from "../utils/sendMail";
import { FORGOT_PASSWORD } from "../constants";

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
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    const [user] = await db
      .select("user", { id: req.session.userId })
      .run(pool);
    if (!user) {
      return null;
    }
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("userInput") userInput: userInput,
    @Ctx() { req }: MyContext
  ): Promise<s.user.JSONSelectable | UserResponse> {
    const errorResponse = validate(userInput);
    if (errorResponse) {
      return {
        error: errorResponse,
      };
    }

    const passwordHash = await argon2.hash(userInput.password);
    let user;
    try {
      user = await db
        .insert("user", {
          username: userInput.username,
          email: userInput.email,
          password: passwordHash,
        })
        .run(pool);
      console.log(user);
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
      return {
        error: [
          {
            field: "username",
            message: "unknown error",
          },
        ],
      };
    }

    req.session.userId = user.id;
    return {
      user: user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<s.user.JSONSelectable | UserResponse> {
    const [user] = await db
      .select(
        "user",
        !usernameOrEmail.includes("@")
          ? {
              username: usernameOrEmail,
            }
          : { email: usernameOrEmail }
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
    req.session.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Ctx() { redis }: MyContext
  ): Promise<Boolean> {
    const token = v4();
    console.log(token);

    const [user] = await db
      .select(
        "user",
        usernameOrEmail.includes("@")
          ? { email: usernameOrEmail }
          : { username: usernameOrEmail }
      )
      .run(pool);
    console.log(user);
    // check whether that user is valid
    // if valid send a reset link with a token to reset
    if (user) {
      await redis.set(
        `${FORGOT_PASSWORD}${token}`,
        user.id,
        "ex",
        1000 * 60 * 60 * 3
      );
      await sendMail(user.email, "rest link", token);
    }
    return true;
    // token redis.set('forgot_password:{token}`, user.id)
  }
  @Mutation(() => UserResponse)
  async resetpassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { req, redis }: MyContext
  ): Promise<UserResponse> {
    // token
    if (newPassword.length < 3) {
      return {
        error: [
          {
            field: "newPassword",
            message: "password length must be atleast 3 characters",
          },
        ],
      };
    }
    const userid = await redis.get(FORGOT_PASSWORD + token);
    // check databse to see whether there is user with that name
    const [user] = await db.select("user", { id: Number(userid) }).run(pool);
    // password check
    if (!user) {
      return {
        error: [
          {
            field: "newPassword",
            message: "token expired",
          },
        ],
      };
    }
    const password = await argon2.hash(newPassword);
    // change-password new password
    const updatedUser = await db
      .update("user", { password }, { id: user.id })
      .run(pool);
    if (!updatedUser.length) {
      return {
        error: [
          {
            field: "newPassword",
            message: "some error occured",
          },
        ],
      };
    } else {
      req.session.userId = user.id;
      return {
        user,
      };
    }
    // return user
    // login
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req }: MyContext): Promise<Boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        if (err) {
          resolve(false);
        }
      });
      resolve(true);
    });
  }
}
