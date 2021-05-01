import { readdirSync, readFileSync } from 'fs';
import { join as pathJoin } from 'path';

export const querySchemaFiles = readdirSync(pathJoin(process.cwd(), "src/schema/queries"))
.filter(file => file.indexOf(".graphql") > 0);

export const querySchema = querySchemaFiles
.map(file => readFileSync(pathJoin(process.cwd(), `src/schema/queries/${file}`)).toString())
.join();

export const queryResolvers = querySchemaFiles
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

export const subscriptionSchemaFiles = readdirSync(pathJoin(process.cwd(), "src/schema/subscriptions"))
.filter(file => file.indexOf(".graphql") > 0);

export const subscriptionSchema = subscriptionSchemaFiles
.map(file => readFileSync(pathJoin(process.cwd(), `src/schema/subscriptions/${file}`)).toString())
.join();

export const subscriptionResolvers = subscriptionSchemaFiles
.map(file => file.replace(".graphql", ".js"))
.map(file => {
  let subscription = require(pathJoin(process.cwd(), `compiled/resolvers/subscriptions/${file}`)).default;
  return subscription;
})
.reduce(
  (initial, current) => ({
    ...initial,
    ...current.Subscription
  }),
  {}
);

export const mutationSchemaFiles = readdirSync(pathJoin(process.cwd(), "src/schema/mutations"))
.filter(file => file.indexOf(".graphql") > 0);

export const mutationSchema = mutationSchemaFiles
.map(file => readFileSync(pathJoin(process.cwd(), `src/schema/mutations/${file}`)).toString())
.join();

export const mutationResolvers = mutationSchemaFiles
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