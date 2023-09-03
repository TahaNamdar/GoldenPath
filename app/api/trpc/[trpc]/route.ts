import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../trpc-router";
import { PrismaClient } from "@prisma/client";
import { nextAuthOptions } from "../../../common/auth";
import { getServerSession } from "next-auth/next";

const handler = (request: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    async createContext(context: any) {
      const prisma = new PrismaClient();
      const session = await getServerSession(
        context.req,
        context.res,
        nextAuthOptions
      );

      return {
        req: request,
        prisma,
        session,
      };
    },
  });
};

export { handler as GET, handler as POST };
