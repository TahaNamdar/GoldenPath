import type { inferAsyncReturnType } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { PrismaClient } from "@prisma/client";


export function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const prisma = new PrismaClient();

  
  return { req, resHeaders, prisma };
}

export type Context = inferAsyncReturnType<typeof createContext>;
