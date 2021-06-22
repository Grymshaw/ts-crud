import { makeExecutableSchema } from '@graphql-tools/schema';

import userTypeDefs from './user';

const baseTypeDefs = `
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

export default [
    makeExecutableSchema({
        typeDefs: [
            baseTypeDefs,
            userTypeDefs,
        ],
   }),
];