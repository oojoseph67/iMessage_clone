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
import { useLazyQuery, useQuery } from "@apollo/client";
import UserSearchList from "./userSearchList";
import Participant from "./participant.";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  setUsername: any;
  participants: any
  setParticipants: any
}

interface SearchedUser {
  id: string;
  username: string;
  image: string;
}

interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

interface SearchUsersInput {
  username: string;
}

const ConversationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  username,
  setUsername,
  participants,
  setParticipants
}) => {
  // const [participants, setParticipants] = useState<Array<SearchedUser>>([]);

  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUsersData,
    SearchUsersInput
  >(UserOperations.Queries.searchUsers);
  // useQuery fires on render while useLazyQuery fires when queried

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

  const addParticipant = (user: SearchedUser) => {
    setParticipants((prev: any[]) => [...prev, user]).filter()
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
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConversationModal;
