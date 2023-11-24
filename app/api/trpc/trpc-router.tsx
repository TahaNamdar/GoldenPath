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

  updateChipIndex: t.procedure
    .input(
      z.object({
        source_id: z.string(),
        destination_id: z.string(),
        destination_index: z.number(),
        item_id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { source_id, destination_id, destination_index, item_id } = input;

      console.log(input, "----------------------------------------------");
      const session = await getServerSession(authOptions);
      const id = (session as any).id;

      try {
        // 1. find the given item by its ID
        const item = await (ctx as any).prisma.LifeGoals.findUnique({
          where: {
            id: source_id,
            user: {
              id,
            },
            userId: id,
          },
        });

        const source_chips = [...item.Chips];

        // 2. remove the item from source
        await (ctx as any).prisma.LifeGoals.updateMany({
          where: {
            id: source_id,
            user: {
              id,
            },
            userId: id,
          },
          data: {
            Chips: {
              set: item.Chips.filter((val: any) => val.id !== item_id),
            },
          },
        });

        // 4. read destination chips
        const lifeGoalDocument = await (ctx as any).prisma.LifeGoals.findUnique(
          {
            where: {
              id: destination_id,
              user: {
                id,
              },
              userId: id,
            },
          }
        );

        // 5. add the item to destination Document in given index
        const chips = [...lifeGoalDocument.Chips];

        console.log(source_chips, "sourceChips");
        const chip = source_chips.filter((_item: any) => _item.id === item_id);
        console.log(chip, "chip");
        chips.splice(destination_index, 0, chip[0]);

        console.log(chips, "chips");

        await (ctx as any).prisma.LifeGoals.update({
          where: {
            id: destination_id,
            user: {
              id,
            },
            userId: id,
          },
          data: {
            Chips: {
              set: chips,
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

  getNotions: t.procedure.query(async ({ ctx }) => {
    try {
      const session = await getServerSession(authOptions);
      const id = (session as any).id;
      const yearlyGoals = await (ctx as any).prisma.YearlyGoals.findMany({
        where: {
          user: {
            id,
          },
        },
      });
      return yearlyGoals;
    } catch (e) {
      console.log(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "something went wrong. please try again late",
      });
    }
  }),

  createNotion: t.procedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { title } = input;

      const session = await getServerSession(authOptions);
      const id = (session as any).id;

      try {
        const createResult = await (ctx as any).prisma.YearlyGoals.create({
          data: {
            userId: id,
            title,
            Tasks: [],
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

  createTask: t.procedure
    .input(
      z.object({
        notionId: z.string(),
        value: z.string(),
        is_sub: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { notionId, value, is_sub } = input;

      const session = await getServerSession(authOptions);
      const id = (session as any).id;

      try {
        const createResult = await (ctx as any).prisma.YearlyGoals.update({
          where: {
            id: notionId,
            user: {
              id,
            },
            userId: id,
          },
          data: {
            Tasks: {
              push: {
                value,
                isFavorite: false,
                subTask: false,
                checked: false,
                visible: false,
              },
            },
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
});

export type AppRouter = typeof appRouter;
