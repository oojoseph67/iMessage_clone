import type { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

import { Box } from "@chakra-ui/react";

import Chat from "../components/chat/chat";
import Auth from "../components/auth/auth";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log("🚀 ~ file: index.tsx:6 ~ data:", session);

  const reloadSession = () => {};

  return (
    <Box>
      {session?.user.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </Box>
  );
};

// adding server rending
export async function getServerSideProps(context: NextPageContext) {
  // do something with session here if needed...
  // since we are on the server sides hooks been called are different

  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Home;
