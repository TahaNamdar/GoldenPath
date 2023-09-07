"use client";

import { trpc } from "@/utils/trpc";

export default function Register() {
  const mutation = trpc.signUp.useMutation();

  const registerHandler = () => {
    const email = "new@gmail.com";
    const password = "145678";
    mutation.mutate({ email, password });
  };

  return (
    <div>
      <button onClick={() => registerHandler()}>Sign up</button>
    </div>
  );
}
