"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  console.log(session, "session");

  const email = "tag@ldfd.com";
  const password = "2344";
  return (
    <div>
      <br />

      <button onClick={() => signIn("credentials", { email, password })}>
        Login
      </button>
      <br />
      <br />
      <button onClick={() => signOut()}>Log Out</button>
      <br />

      {session?.user ? <h1>You're SignIn !</h1> : <h1>You Should Login!</h1>}
    </div>
  );
}
