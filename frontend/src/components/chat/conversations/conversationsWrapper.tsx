import React from "react";
import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import ConversationsList from "./conversationList";
import ConversationOperations from "../../../graphql/operations/conversation";
import { useQuery } from "@apollo/client";
import { ConversationsData } from "../../../utils/types";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
  } = useQuery<ConversationsData>(ConversationOperations.Queries.conversations);
  console.log(
    "🚀 ~ file: conversationsWrapper.tsx:22 ~ data:",
    conversationsData
  );

  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      border="1px solid red"
      bg="whiteAlpha.50"
      py={6}
      px={3}>
      {/* Skeleton Loader */}
      <ConversationsList
        session={session}
        conversations={conversationsData?.conversations || []}
      />
    </Box>
  );
};

export default ConversationsWrapper;
