import React from 'react'
import { Button, Flex } from "@chakra-ui/react"
import { signOut } from 'next-auth/react'
import ConversationsWrapper from './conversations/conversationsWrapper'
import FeedWrapper from './feed/feedWrapper'
import { Session } from 'next-auth'

interface ChatProps {
  session: Session
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  return (
    <Flex height="100vh">
      <ConversationsWrapper session={session} />
      <FeedWrapper session={session} />
    </Flex>
  );
}

export default Chat