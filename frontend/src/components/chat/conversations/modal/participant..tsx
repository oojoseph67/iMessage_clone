import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ParticipantProps {
  participants: Array<{ id: string; username: string; image: string }>;
  removeParticipant: (userId: string) => void;
}

const Participant: React.FC<ParticipantProps> = ({
  participants,
  removeParticipant,
}) => {
  console.log("🚀 ~ file: participant..tsx:12 ~ participants:", participants);
  return (
    <Flex mt={8} gap="10px" flexWrap="wrap">
      {participants.map((participant) => (
        <Stack direction="row" key={participant.id} align="center" bg="whiteAlpha.200" borderRadius={4}>
          <img
            src={participant.image}
            alt="Avatar"
            width="50px"
            height="50px"
            vertical-align="middle"
            border-radius="50%"
          />
          <Text>{participant.username}</Text>
          <IoIosCloseCircleOutline
            size={20}
            cursor="pointer"
            onClick={() => removeParticipant(participant.id)}
          />
        </Stack>
      ))}
    </Flex>
  );
};

export default Participant;
