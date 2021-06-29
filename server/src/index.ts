import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { stitchSchemas } from '@graphql-tools/stitch';
import { PrismaClient } from '@prisma/client';

import subschemas from './typeDefs';
import resolvers from './resolvers';

dotenv.config();

const prisma = new PrismaClient();

const schema = stitchSchemas({
  subschemas,
  resolvers,
});

const server = new GraphQLServer({
  schema,
  context: ({ request, response }) => ({ prisma, req: request, res: response }),
});

server.express.use(cookieParser());

// Set auth header middleware
server.express.use((req, _, next) => {
  const authHeader = req.cookies.accessToken;
  if (authHeader) {
    req.headers.authorization = `Bearer ${authHeader}`;
  }
  next();
});

const options = {
  port: process.env.PORT || 4001,
  cors: {
    credentials: true,
    origin: [process.env.FRONTEND_URL as string],
  },
};
server.start(options, () => console.log(`Running on port ${options.port}`));
