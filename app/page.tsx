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

  return (
    <div>
      <h2>My Amazing App</h2>


      <button onClick={() => registerHandler()}>Sign up</button>

    </div>
  );
}
