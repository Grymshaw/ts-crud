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

const port = process.env.PORT || 4001;
server.start({ port }, () => console.log(`Running on port ${port}`));