import React from "react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  const router = useRouter();
  const { conversationId } = router.query;

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      direction="column"
      width="100%"
      border="1px solid orange">
      {conversationId ? (
        <>
          <Flex>{conversationId}</Flex>
        </>
      ) : (
        <>
          <Flex>No Conversation Selected</Flex>
        </>
      )}
    </Flex>
  );
};

export default FeedWrapper;
