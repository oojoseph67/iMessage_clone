import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ConversationPopulated } from "../../../../../backend2/src/util/types";

interface ConversationItemProps {
  conversation: ConversationPopulated;
}

const conversationItem: React.FC<ConversationItemProps> = ({
  conversation,
}) => {
  return (
    <Stack p={4} _hover={{ bg: "whiteAlpha.200" }} borderRadius={4}>
      <Text>{conversation.id}</Text>
    </Stack>
  );
};

export default conversationItem;
