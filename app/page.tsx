"use client";

import { trpc } from "@/utils/trpc";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default function Home() {
  // Get user session token
  // const session = await getServerSession(authOptions);
  // session = null || { user: { name, email, image } }

  const mutation = trpc.signUp.useMutation();

  const registerHandler = () => {
    const email = "q@gmail.com";
    const password = "12345";
    mutation.mutate({ email, password });
  };

  // console.log(session, "se");
  return (
    <div>
      <h2>My Amazing App</h2>

      {/* {session && ( */}
      <div>
        {/* <p>Signed in as {session.user && session.user.name}</p> */}
        {/* <a href="/api/auth/signout">Sign out by link</a> */}
        testtttttttttt
      </div>
      {/* )} */}

      <button onClick={() => registerHandler()}>Sign up</button>

      {/* {!session && <p>Not signed in</p>} */}
    </div>
  );
}
