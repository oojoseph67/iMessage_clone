import {
  Button,
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { SearchedUser } from "../../../../utils/types";

interface UserSearchListProps {
  users: Array<SearchedUser>;
  addParticipant: (user: SearchedUser) => void // we need to make know what this function accepts and what the function rejects
}

const UserSearchList: React.FC<UserSearchListProps> = ({
  users,
  addParticipant
}) => {
  return (
    <>
      {users.length === 0 ? (
        <Flex mt={6} justify="center">
          <Text>No users found</Text>
        </Flex>
      ) : (
        <Stack mt={6}>
          {users.map((user) => (
            <Stack
              key={user.id}
              direction="row"
              align="center"
              spacing={4}
              py={2}
              px={4}
              borderRadius={4}
              _hover={{ bg: "whiteAlpha.200" }}>
              <img
                src={user.image}
                alt="Avatar"
                width="50px"
                height="50px"
                vertical-align="middle"
                border-radius="50%"
              />
              <Flex justify="space-between" align="center" width="100%">
                <Text color="whiteAlpha.700">{user.username}</Text>
                <Button
                  bg="brand.100"
                  _hover={{ bg: "brand.100" }}
                  onClick={() => addParticipant(user)}>
                  Select
                </Button>
              </Flex>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
};

export default UserSearchList;
