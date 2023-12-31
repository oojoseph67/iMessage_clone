import React, { useState } from "react";
import { Session } from "next-auth";
import { Box, Text } from "@chakra-ui/react";
import ConversationModal from "./modal/modal";
import { SearchedUser } from "../../../utils/types";
import { ConversationPopulated } from "../../../../../backend2/src/util/types";
import ConversationItem from "./conversationItem";
import { useRouter } from "next/router";

interface ConversationsListProps {
  session: Session;
  conversations: Array<ConversationPopulated>;
  onViewConversation: (conversationId: string) => void
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  console.log(
    "🚀 ~ file: conversationList.tsx:18 ~ conversations:",
    conversations
  );
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  const router = useRouter();
  const { user: { id: userId } } = session

  const onOpen = () => setIsOpen(true);
  const onClose = () => {
    setIsOpen(false);
    setUsername("");
    setParticipants([]);
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
        <Text textAlign="center" color="whiteAlpha.800" fontWeight={500}>
          Find or start a conversation
        </Text>
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
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          userId={userId}
          conversation={conversation}
          onClick={() => onViewConversation(conversation.id)}
          isSelected={conversation.id === router.query.conversationId}
        />
      ))}
    </Box>
  );
};

export default ConversationsList;
