"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();

  const router = useRouter();

  const email = "tag@ldfd.com";
  const password = "12345";

  const submit = async () => {
    const login = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-screen">
      <br />
      <button onClick={() => submit()} className="text-white">
        Login
      </button>
      <br />
      <br />
      <button
        className="text-white"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Log Out
      </button>
      <br />

      {session ? (
        <h1 className="text-white">You're SignIn !</h1>
      ) : (
        <h1 className="text-white">You Should Login!</h1>
      )}
    </div>
  );
}
