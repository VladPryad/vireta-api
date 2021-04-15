import Koa from "koa";
import KoaRouter from "koa-router";
import { ApolloServer, gql } from "apollo-server-koa";
import { readdirSync, readFileSync } from 'fs';
import { join as pathJoin } from 'path';

const errorHandler = (err: any) => {
  console.log("Error while running resolver", {
    error: err
  });
  return err.message;
};

export function createServer(): Koa {
  const app = new Koa();

  const router = new KoaRouter();

  const querySchemaFiles = readdirSync(pathJoin(process.cwd(), "src/schema/queries"))
  .filter(file => file.indexOf(".graphql") > 0);

  const querySchema = querySchemaFiles
  .map(file => readFileSync(pathJoin(process.cwd(), `src/schema/queries/${file}`)).toString())
  .join();

const queryResolvers = querySchemaFiles
  .map(file => file.replace(".graphql", ".js"))
  .map(file => {
    let query = require(pathJoin(process.cwd(), `compiled/resolvers/queries/${file}`)).default;
    return query;
  })
  .reduce(
    (initial, current) => ({
      ...initial,
      ...current.Query
    }),
    {}
  );

  const mutationSchemaFiles = readdirSync(pathJoin(process.cwd(), "src/schema/mutations"))
  .filter(file => file.indexOf(".graphql") > 0);

  const mutationSchema = mutationSchemaFiles
  .map(file => readFileSync(pathJoin(process.cwd(), `src/schema/mutations/${file}`)).toString())
  .join();

const mutationResolvers = mutationSchemaFiles
  .map(file => file.replace(".graphql", ".js"))
  .map(file => {
    let mutation = require(pathJoin(process.cwd(), `compiled/resolvers/mutations/${file}`)).default;
    return mutation;
  })
  .reduce(
    (initial, current) => ({
      ...initial,
      ...current.Mutation
    }),
    {}
  );

  const server = new ApolloServer({
    typeDefs: gql(`
    type Query
    type Mutation

    schema {
      query: Query
      mutation: Mutation
    }

    ${querySchema}
    ${mutationSchema}
  `),
    context: ({ ctx }) => ctx,
    formatError: errorHandler,
    resolvers: {
      Query: queryResolvers,
      Mutation: mutationResolvers
    }
  });

  router.post("/graphql", server.getMiddleware());
  router.get("/graphql", server.getMiddleware());

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}