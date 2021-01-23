import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { PostResolver } from "./resolvers/postResolver";
import { buildSchema } from "type-graphql";

const main = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver],
      validate: false,
      dateScalarMode: "timestamp",
    }),
  });

  apolloServer.applyMiddleware({ app });

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`);
  });
};

main().catch((e) => {
  console.log(e);
});
