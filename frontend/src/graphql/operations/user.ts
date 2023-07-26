// all graphql query for user

import { gql } from "@apollo/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default  {
    Queries: {
        searchUsers: gql`
            query SearchUsers($username: String!) {
                searchUsers(username: $username) {
                    id,
                    username,
                    image
                }
            }
        ` 
    },
    Mutations: {
        createUsername: gql`
            mutation CreateUsername($username: String!) {
                createUsername(username: $username) {
                    success
                    error
                }
            }
        `
    },
    Subscriptions: {}
}