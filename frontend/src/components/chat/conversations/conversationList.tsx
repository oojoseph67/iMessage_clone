import React, { useState } from "react";
import { Session } from "next-auth";
import { Box, Text } from "@chakra-ui/react";
import ConversationModal from "./modal/modal";

interface ConversationsListProps {
  session: Session;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ session }) => {

  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false);

  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg='blackAlpha.300'
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}
      >
        <Text>Find or start a conversation</Text>
      </Box>
      <ConversationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
};

export default ConversationsList;
