// all graphql query for user

import { gql } from "@apollo/client";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Queries: {
    conversations: gql`
      query Conversation {
        conversations {
          id
          participants {
            user {
              id
              username
              image
            }
            hasSeenLatestMessage
          }
          latestMessage {
            id
            sender {
              id
              username
              image
            }
            body
            createdAt
          }
          updatedAt
        }
      }
    `
  },
  Mutations: {
      createConversation: gql`
        mutation CreateConversation($participantIds: [String]!) {
            createConversation(participantIds: $participantIds) {
                conversationId
            }
        }
    `
  },
  Subscriptions: {},
};
