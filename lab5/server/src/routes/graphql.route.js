import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';
import { resolver, schema } from '../graphql/worker.resolver.js';

const graphqlRouter = Router();

graphqlRouter.use('/', graphqlHTTP({
  schema: schema,
  rootValue: resolver,
  graphiql: true,
}));

export default graphqlRouter;
