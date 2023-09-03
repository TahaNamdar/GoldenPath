"use client";

import { trpc } from "@/utils/trpc";

export default function Register() {
  const mutation = trpc.signUp.useMutation();

  const registerHandler = () => {
    const email = "taha@gmail.com";
    const password = "12345678";
    mutation.mutate({ email, password });
  };

  return (
    <div>
      <input type="email" placeholder="email" />
      <input type="password" placeholder="password" />
      <button onClick={() => registerHandler()}>Sign up</button>
    </div>
  );
}
