import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';

const typesArray = loadFilesSync(
    path.join(__dirname, '.'),
    { extensions: ['graphql'] },
);

const mergedTypeDefs = mergeTypeDefs(typesArray);

export default [
    makeExecutableSchema({
        typeDefs: mergedTypeDefs,
    }),
];