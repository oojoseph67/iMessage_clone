import {ConversationPopulated } from '../../../backend2/src/util/types'

/**
 * User interfaces
 */

export interface CreateUsernameData {
    createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface SearchedUser {
  id: string;
  username: string;
  image: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchUsersInput {
  username: string;
}

/**
 * Conversations
 */

export interface ConversationsData {
  conversations: Array<ConversationPopulated>
}

export interface CreateConversationData {
    createConversation: {
        conversationId: string
    }
}

export interface CreateConversationInput {
    participantIds: Array<string>
}
