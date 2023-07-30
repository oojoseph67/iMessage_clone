// import { gql } from "apollo-server-core"

const typeDefs = `#graphql
    type User {
        id: String
        username: String
        image: String
        name: String
        email: String
        emailVerified: Boolean
    }

    type Query {
        searchUsers(username: String): [User]
    }

    type Mutation {
        createUsername(username: String): CreateUsernameResponse
    }

    type CreateUsernameResponse {
        success: Boolean
        error: String
    }

`;

export default typeDefs;
