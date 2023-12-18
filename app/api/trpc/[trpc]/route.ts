import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../trpc-router";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    async createContext(context: any) {
      const prisma = new PrismaClient();
      const session = await getServerSession(authOptions);
	

      return {
        req: request,
        prisma,
        session,
      };
    },
  });
};

export { handler as GET, handler as POST };
