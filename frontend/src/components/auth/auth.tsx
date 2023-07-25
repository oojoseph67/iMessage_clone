import { Session } from "next-auth";
import React, { useState } from "react";

import { Button, Center, Stack, Text, Image, Input } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

import UserOperations from "../../graphql/operations/user";
import { gql, useMutation, useQuery } from "@apollo/client";

import toast from "react-hot-toast";

interface AuthProps {
  session: Session | null;
  reloadSession: () => void; // fetches data from the database after a username once created
}

interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

interface CreateUsernameVariables {
  username: string;
}

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  console.log("🚀 ~ file: auth.tsx:34 ~ error:", error);
  console.log("🚀 ~ file: auth.tsx:35 ~ loading:", loading);
  console.log("🚀 ~ file: auth.tsx:36 ~ data:", data);

  const onSubmit = async () => {
    if (!username) return;
    try {
      const { data: response } = await createUsername({
        variables: { username: username },
      });

      setUsername("");

      if (!response?.createUsername) {
        throw new Error();
      }

      if (data?.createUsername.error) {
        const {
          createUsername: { error },
        } = response;
        throw new Error(error);
      }

      /**
       * Reload session to obtain new username
       */

      toast.success("Username successfully created! 🚀🚀");

      reloadSession();
    } catch (error: any) {
      toast.error(error?.message);
      setUsername("");
      console.error("🚀 ~ file: auth.tsx:19 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <Center height="100vh" border="1px solid red">
      <Stack spacing={10} align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username {session?.user.name}</Text>
            <Input
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              width="100%"
              disabled={loading}
              onClick={onSubmit}
              isLoading={loading}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="3xl">iMessage by mcQu33n</Text>
            <Button
              onClick={() => signIn("google")}
              leftIcon={
                <Image
                  height="20px"
                  src="/images/googlelogo.png"
                  alt="googlelogo"
                />
              }>
              Continue with Google
            </Button>
          </>
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
