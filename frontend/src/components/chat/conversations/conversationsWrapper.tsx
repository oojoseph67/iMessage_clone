import React, { useEffect } from "react";
import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import ConversationsList from "./conversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import { ConversationsData } from "../../../utils/types";
import { ConversationPopulated } from "../../../../../backend2/src/util/types";
import { useRouter } from "next/router";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const router = useRouter();
  const { query: { conversationId } } = router 
  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
    subscribeToMore: conversationSubscribe,
  } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);
  console.log(
    "🚀 ~ file: conversationsWrapper.tsx:22 ~ data:",
    conversationsData
  );

  const subscribeToNewConversations = () => {
    conversationSubscribe({
      document: ConversationOperations.Subscriptions.conversationCreated,
      // variables:
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;

        console.log(
          "🚀 ~ file: conversationsWrapper.tsx:43 ~ subscribeToNewConversations ~ subscriptionData:",
          subscriptionData
        );

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  const onViewConversation = async (conversationId: string) => {
    /**
     * 1. Push the conversationId to the router query params
     */
    router.push({ query: { conversationId } });

    /**
     * 2. Mark the conversation as read
     */
  };

  /**
   * Execute subscription on mount
   */

  useEffect(() => {
    subscribeToNewConversations();
  }, []);

  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}>
      {/* Skeleton Loader */}
      <ConversationsList
        session={session}
        conversations={conversationsData?.conversations || []}
        onViewConversation={onViewConversation}
      />
    </Box>
  );
};

export default ConversationsWrapper;
