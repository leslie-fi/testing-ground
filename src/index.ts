/* eslint-disable import/first, functional/no-expression-statement */
import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";

import * as DB from "./db";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/typeDefs";
import { Context } from "src/graphql/types";

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }): Promise<Context> => ({
      req,
      res,
      db: await DB.connect(),
    }),
  });

  const app = Express();
  
  server.applyMiddleware({ app });
  app.listen(8080, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:8080${server.graphqlPath}`
    )
  );
};

main().catch((error: Error | null) => console.error(error?.message));
