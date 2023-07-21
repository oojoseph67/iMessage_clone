import { Session } from "next-auth";
import React, { useState } from "react";

import { Button, Center, Stack, Text, Image, Input } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

interface AuthProps {
  session: Session | null;
  reloadSession: () => void; // fetches data from the database after a username once created
}

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");

  const onSubmit = async () => {
    try {
        // create a graphQL mutation
    } catch (error) {
      console.log("🚀 ~ file: auth.tsx:19 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <Center height="100vh" border="1px solid red">
      <Stack spacing={10} align="center">
        {session ? (
          <>
            <Text fontSize="3xl">Create a Username</Text>
            <Input
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button width="100%" onClick={onSubmit}>Save</Button>
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
