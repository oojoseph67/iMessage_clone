import React from "react";
import { Session } from "next-auth";
import { Box } from "@chakra-ui/react";
import ConversationsList from "./conversationList";

interface ConversationsWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationsWrapperProps> = ({
  session,
}) => {
  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      border="1px solid red"
      bg="whiteAlpha.50"
      py={6}
      px={3}>
      {/* Skeleton Loader */}
      <ConversationsList session={session} />
    </Box>
  );
};

export default ConversationsWrapper;
