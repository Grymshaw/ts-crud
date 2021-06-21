import { makeExecutableSchema } from '@graphql-tools/schema';

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
        ],
   }),
];