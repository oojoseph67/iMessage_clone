import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data } = useSession();
  console.log("🚀 ~ file: index.tsx:6 ~ data:", data);

  return (
    <div>
      <button onClick={() => signIn("google")}>Sign In</button>
      <button onClick={() => signOut()}></button>
      {data?.user?.name}
    </div>
  );
};

export default Home;
