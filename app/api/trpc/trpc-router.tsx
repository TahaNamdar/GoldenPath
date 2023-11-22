import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { date, z } from "zod";
import { hash } from "argon2";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { verify } from "argon2";
import { trpc } from "@/utils/trpc";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  signUp: t.procedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
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

        const _LifeGoalDocuments = [];

        const result = await (ctx as any).prisma.user.create({
          data: { email, password: hashedPassword },
        });

        for (let i = 1; i <= 100; i++) {
          _LifeGoalDocuments.push({
            userId: result.id,
            age: i,
            Chips: [],
          });
        }

        await (ctx as any).prisma.LifeGoals.createMany({
          data: _LifeGoalDocuments,
        });

        return {
          status: 201,
          message: "Account created successfully",
          result: result.email,
        };
      } catch (e) {
        console.log(e);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong. please try again late",
        });
      }
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
        oldPassword: z.string().min(8),
        newPassword: z.string().min(8),
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

  //change birthday

  changeBirthday: t.procedure
    .input(
      z.object({
        birthday: date(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { birthday } = input;

      const session = await getServerSession(authOptions);

      const user = await (ctx as any).prisma.user.findUnique({
        where: {
          id: (session as any).id,
        },
      });

      const updateBirthday = await (ctx as any).prisma.user.update({
        where: {
          id: (session as any).id,
        },
        data: {
          birthday: birthday,
        },
      });
    }),

  //get user by id

  getOneUser: t.procedure.query(async ({ ctx }) => {
    const session = await getServerSession(authOptions);

    return (ctx as any).prisma.user.findUnique({
      where: {
        id: (session as any).id,
      },
    });
  }),

  /*
    Life Goals

    GET -> All
    PUT -> age, chips
  */

  getLifeGoals: t.procedure.query(async ({ ctx }) => {
    try {
      const session = await getServerSession(authOptions);
      const id = (session as any).id;
      const lifeGoals = await (ctx as any).prisma.LifeGoals.findMany({
        where: {
          user: {
            id,
          },
        },
      });
      return lifeGoals;
    } catch (e) {
      console.log(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "something went wrong. please try again late",
      });
    }
  }),

  createLifeGoal: t.procedure
    .input(
      z.object({
        age: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { age } = input;

      const session = await getServerSession(authOptions);
      const id = (session as any).id;

      try {
        const createResult = await (ctx as any).prisma.LifeGoals.create({
          data: {
            age,
            userId: id,
            Chips: [],
          },
        });

        return createResult;
      } catch (e) {
        console.log(e);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong. please try again late",
        });
      }
    }),

  updateChips: t.procedure
    .input(
      z.object({
        age: z.number(),
        chip: z.object({ id: z.string(), value: z.string(), age: z.string() }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { age, chip } = input;
      const session = await getServerSession(authOptions);
      const id = (session as any).id;

      try {
        /*

                prisma.$transaction(async (tx) => {
                    await tx.model.create({ data: { ... });
                    await tx.model.findFirstOrThrow();
                    })

                */
        const res = await (ctx as any).prisma.LifeGoals.findMany({
          where: {
            user: {
              id,
            },
            userId: id,
            age,
          },
        });

        await (ctx as any).prisma.LifeGoals.updateMany({
          where: {
            user: {
              id,
            },
            userId: id,
            age,
          },
          data: {
            Chips: {
              set: [...res[0].Chips, chip],
            },
          },
        });
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong. please try again late",
        });
      }
    }),

  deleteChips: t.procedure
    .input(
      z.object({
        age: z.number(),
        chipId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { age, chipId } = input;
      const session = await getServerSession(authOptions);
      const id = (session as any).id;

      try {
        const result = await (ctx as any).prisma.LifeGoals.findMany({
          where: {
            user: {
              id,
            },
            userId: id,
            age,
          },
        });

        

        const newChip = result[0].Chips.filter((_chip: any) => {
          return chipId !== _chip.id;
        });

        await (ctx as any).prisma.LifeGoals.updateMany({
          where: {
            user: {
              id,
            },
            userId: id,
            age,
          },
          data: {
            Chips: newChip,
          },
        });
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong. please try again late",
        });
      }
    }),
});

export type AppRouter = typeof appRouter;
