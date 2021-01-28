import "reflect-metadata";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { PostResolver } from "./resolvers/postResolver";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/userResolver";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from "express-session";
import { SECRET, __PROD__ } from "./constants";

const redis = new Redis();

const RedisStore = connectRedis(session);

const main = async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      cookie: {
        secure: __PROD__,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
      },
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      name: "qid",
      secret: SECRET,
      saveUninitialized: false,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
};

main().catch((e) => {
  console.log(e);
});
