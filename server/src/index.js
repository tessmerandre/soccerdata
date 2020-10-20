import express from 'express';
import helmet from 'helmet';
import axios from 'axios';
import { ApolloServer } from 'apollo-server-express';
import { appSchema } from './model';

const server = new ApolloServer({
  schema: appSchema,
  context: async ({ req }) => {
    return { 'user': 'andré' };
  }
});

const app = express();
server.applyMiddleware({ app });

app.use(helmet());
app.use(express.json());

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
