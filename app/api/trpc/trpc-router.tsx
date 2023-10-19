import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { hash } from "argon2";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  signUp: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(4).max(12),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const exists = await (ctx as any).prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already exists.",
        });
      }

      const hashedPassword = await hash(password);

      const result = await (ctx as any).prisma.user.create({
        data: { email, password: hashedPassword },
      });

      return {
        status: 201,
        message: "Account created successfully",
        result: result.email,
      };
    }),

  //find and update prisma
});

export type AppRouter = typeof appRouter;
