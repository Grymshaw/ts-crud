const typeDefs = `
    extend type Mutation {
        login(input: LoginInput!): LoginPayload!
        signup(input: SignupInput!): SignupPayload!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type LoginPayload {
        user: User!
    }

    input SignupInput {
        username: String!
        password: String!
        passwordConform: String!
    }

    type SignupPayload {
        user: User!
    }

    type User {
        id: Int!
        username: String!
        password: String!
    }
`;

export default typeDefs;