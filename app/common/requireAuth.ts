
 import { getServerSession } from "next-auth/next";
 import { nextAuthOptions } from "./auth";

export async function requireAuth(context: any) {
  const session = await getServerSession(
    context.req,
    context.res,
    nextAuthOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
