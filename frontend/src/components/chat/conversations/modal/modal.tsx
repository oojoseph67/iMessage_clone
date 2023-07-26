import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UserOperations from "../../../../graphql/operations/user";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import UserSearchList from "./userSearchList";
import Participant from "./participant.";
import { toast } from "react-hot-toast";
import {
  CreateConversationData,
  CreateConversationInput,
  SearchUsersData,
  SearchUsersInput,
  SearchedUser,
} from "../../../../utils/types";
import ConversationOperations from "../../../../graphql/operations/conversation";
import { Session } from "next-auth";

interface ModalProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
  username: string;
  setUsername: any;
  participants: any;
  setParticipants: any;
}

const ConversationModal: React.FC<ModalProps> = ({
  session,
  isOpen,
  onClose,
  username,
  setUsername,
  participants,
  setParticipants,
}) => {
  // const [participants, setParticipants] = useState<Array<SearchedUser>>([]);
  // const { user: { id: userId }} = session

  const userId = session?.user?.id

  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);
  // useQuery fires on render while useLazyQuery fires when queried

  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      ConversationOperations.Mutations.createConversation
    );

  console.log("🚀 ~ file: modal.tsx:44 ~ data:", data);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    try {
      searchUsers({ variables: { username } });
    } catch (error: any) {
      console.error("error while searching");
    }
  };

  const onCreateConversation = async () => {
    const transformParticipantId = [userId, ...participants.map((p: any) => p.id)]
    console.log("🚀 ~ file: modal.tsx:78 ~ onCreateConversation ~ transformParticipantId:", transformParticipantId)
    try {
      const { data } = await createConversation({
        variables: {
          participantIds: transformParticipantId,
        },
      });
      console.log("🚀 ~ file: modal.tsx:84 ~ onCreateConversation ~ data:", data)
    } catch (error: any) {
      console.error(
        "🚀 ~ file: modal.tsx:74 ~ onCreateConversation ~ error:",
        error
      );
      toast.error(error?.message);
    }
  };

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev: any[]) => [...prev, user]);
    setUsername("");
  };

  // NB: prev = previous (more like a mapping function)

  const removeParticipant = (userId: string) => {
    setParticipants((prev: any[]) => prev.filter((p) => p.id !== userId));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#2d2d2d" pb={4}>
          <ModalHeader>Create/Search Conversation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={onSearch}>
              <Stack spacing={4}>
                <Input
                  placeholder="Enter a username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <Button type="submit" disabled={!username} isLoading={loading}>
                  {" "}
                  Submit{" "}
                </Button>
              </Stack>
            </form>

            {data?.searchUsers && (
              <UserSearchList
                users={data?.searchUsers}
                addParticipant={addParticipant}
              />
            )}
            {participants.length !== 0 && (
              <>
                <Participant
                  participants={participants}
                  removeParticipant={removeParticipant}
                />
                <Button
                  bg="brand.100"
                  width="100%"
                  mt={6}
                  _hover={{ bg: "brand.100" }}
                  isLoading={createConversationLoading}
                  onClick={onCreateConversation}>
                  Create Conversation
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
