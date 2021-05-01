import Koa from "koa";
import KoaRouter from "koa-router";
import { ApolloServer, gql } from "apollo-server-koa";
import pubsub from './pubsub'
import cors from '@koa/cors';
import dotenv from 'dotenv'
import { 
  mutationResolvers,
  mutationSchema,
  queryResolvers,
  querySchema,
  subscriptionResolvers,
  subscriptionSchema } from "./gql-files";

dotenv.config();

const errorHandler = (err: any) => {
  console.log("Error while running resolver", {
    error: err
  });
  return err.message;
};

export async function createServer() {
  const app = new Koa();

  const corsOptions = {
    origin: "*",
    credentials: true
  };

  app.use(cors(corsOptions));

  const router = new KoaRouter();

  const server = new ApolloServer({
    typeDefs: gql(`
    type Query
    type Mutation
    type Subscription

    schema {
      query: Query
      mutation: Mutation
      subscription: Subscription
    }

    ${querySchema}
    ${mutationSchema}
    ${subscriptionSchema}
  `),
    context: ({ ctx }) => ({ ctx,  pubsub}),
    formatError: errorHandler,
    resolvers: {
      Query: queryResolvers,
      Mutation: mutationResolvers,
      Subscription: subscriptionResolvers
    }
  });

  router.post("/graphql", server.getMiddleware());
  router.get("/graphql", server.getMiddleware());

  app.use(router.routes());
  app.use(router.allowedMethods());

  const httpServer = app.listen(process.env.PORT_REST_EXPOSE);
  server.installSubscriptionHandlers(httpServer);
  
  console.log(`API Gateway listening on ${process.env.PORT_REST_EXPOSE}/graphql`);
}