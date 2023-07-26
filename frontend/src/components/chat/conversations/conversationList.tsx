import React, { useState } from "react";
import { Session } from "next-auth";
import { Box, Text } from "@chakra-ui/react";
import ConversationModal from "./modal/modal";
import { SearchedUser } from "../../../utils/types";

interface ConversationsListProps {
  session: Session;
}

const ConversationsList: React.FC<ConversationsListProps> = ({ session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);


  const onOpen = () => setIsOpen(true);
  const onClose = () => {
    setIsOpen(false);
    setUsername("");
    setParticipants([])
  };

  return (
    <Box width="100%">
      <Box
        py={2}
        px={4}
        mb={4}
        bg="blackAlpha.300"
        borderRadius={4}
        cursor="pointer"
        onClick={onOpen}>
        <Text>Find or start a conversation</Text>
      </Box>
      <ConversationModal
        session={session}
        username={username}
        setUsername={setUsername}
        participants={participants}
        setParticipants={setParticipants}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default ConversationsList;
