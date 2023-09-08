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

    if (login?.error) {
      router.push((login as any).url);
    } else {
      <div
        id="toast-undo"
        className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div className="text-sm font-normal">login failed.</div>
        <div className="flex items-center ml-auto space-x-2">
          <a
            className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-700"
            href="#"
          >
            Undo
          </a>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            data-dismiss-target="#toast-undo"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      </div>;
    }
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
