import React from "react";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import MessagesHeader from "./Messages/Header";

interface FeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  const router = useRouter();
  const { conversationId } = router.query;

  const {
    user: { id: userId },
  } = session;

  return (
    <Flex
      display={{ base: conversationId ? "flex" : "none", md: "flex" }}
      direction="column"
      width="100%">
      {conversationId && typeof conversationId === "string" ? (
        <>
          <Flex
            direction="column"
            justify="space-between"
            overflow="hidden"
            flexGrow={1}
            border="1px solid red">
            <MessagesHeader userId={userId} conversationId={conversationId} />

            {/* <Message /> */}
          </Flex>
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
