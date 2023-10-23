import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { hash } from "argon2";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { verify } from "argon2";

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

  // change email
  changeEmail: t.procedure
    .input(
      z.object({
        newEmail: z.string(),
        newEmailPassFiled: z.string().min(4).max(12),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { newEmail, newEmailPassFiled } = input;

      const session = await getServerSession(authOptions);

      const user = await (ctx as any).prisma.user.findUnique({
        where: {
          id: (session as any).id,
        },
      });

      const isValidPassword = await verify(user.password, newEmailPassFiled);

      if (!isValidPassword) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "username or password is wrong!",
        });
      }

      const updateUser = await (ctx as any).prisma.user.update({
        where: {
          id: (session as any).id,
        },
        data: {
          email: newEmail,
        },
      });
    }),

  //change password

  changePassword: t.procedure
    .input(
      z.object({
        oldPassword: z.string().min(4).max(12),
        newPassword: z.string().min(4).max(12),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { oldPassword, newPassword } = input;

      const session = await getServerSession(authOptions);

      const user = await (ctx as any).prisma.user.findUnique({
        where: {
          id: (session as any).id,
        },
      });

      const isValidPassword = await verify(user.password, oldPassword);

      if (!isValidPassword) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "password is wrong",
        });
      }

      const hashedNewPassword = await hash(newPassword);

      const updatePassword = await (ctx as any).prisma.user.update({
        where: {
          id: (session as any).id,
        },
        data: {
          password: hashedNewPassword,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
