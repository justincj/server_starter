import { Post } from "../graphSchema/post";
import { Arg, Mutation, ObjectType, Query } from "type-graphql";
import * as db from "zapatos/db";
import pool from "../config/pgPool";
import * as s from "zapatos/schema";

@ObjectType()
export class PostResolver {
  @Query(() => [Post])
  async posts(): Promise<s.post.JSONSelectable[]> {
    const allPosts = await db.select("post", db.all).run(pool);
    return allPosts;
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: number): Promise<s.post.JSONSelectable | null> {
    const post = await db
      .selectOne("post", {
        id,
      })
      .run(pool);
    if (!post) {
      return null;
    }
    return post;
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(@Arg("id") id: number, @Arg("title") title: string) {
    const post = await db
      .selectOne("post", {
        id,
      })
      .run(pool);
    if (!post || title.length < 3) {
      return null;
    }
    const [updatedPost] = await db.update("post", { title }, { id }).run(pool);
    return updatedPost;
  }

  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("title") title: string
  ): Promise<s.post.JSONSelectable | null> {
    try {
      const post = await db
        .insert("post", {
          title,
        })
        .run(pool);
      return post;
    } catch (e) {
      return null;
    }
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: number) {
    // const post = await db.select("post", { id }).run(pool);
    // if(!post.length){
    //     return false
    // }
    // try {
    //    const result =  await db.deletes("post", {id}).run(pool);
    // } catch(e){

    // }
    const result = await db.deletes("post", { id }).run(pool);
    if (result.length) {
      return true;
    }
    return false;
  }
}
