import { GraphQLServer } from 'graphql-yoga';
import { stitchSchemas } from '@graphql-tools/stitch';

import subschemas from './typeDefs';
import resolvers from './resolvers';

const schema = stitchSchemas({
    subschemas,
    resolvers,
});

const server = new GraphQLServer({ schema });

const port = process.env.PORT || 4001;
server.start({ port }, () => console.log(`Running on port ${port}`));