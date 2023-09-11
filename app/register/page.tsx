"use client";

import { trpc } from "@/utils/trpc";

export default function Register() {
  const mutation = trpc.signUp.useMutation();

  const registerHandler = () => {
    const email = "test22@gmail.com";
    const password = "14225d678";
    mutation.mutate({ email, password });
  };

  return (
    <div>
      <button onClick={() => registerHandler()}>SignUp</button>
    </div>
  );
}
