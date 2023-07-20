import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data } = useSession();
  console.log("🚀 ~ file: index.tsx:6 ~ data:", data);

  return (
    <div>
      {data?.user?.name ? (
        <button onClick={() => signOut()}>SignOut</button>
      ) : (
       <button onClick={() => signIn("google")}>Sign In</button>
      )}
      {data?.user?.name}
    </div>
  );
};

export default Home;
