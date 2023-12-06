import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { date, z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { trpc } from "@/utils/trpc";
import { Notion, NotionTask } from "@/type";
import { v4 as uuidv4 } from "uuid";
import { getLargestIndex } from "@/utils/getLargestIndex";
import { scrypt as _scrypt, randomBytes, verify } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

const t = initTRPC.create({
    transformer: superjson,
});

const isUser = t.middleware(async (opts: any) => {
    const session = await getServerSession(authOptions);
    const { id } = session as any;

    const { ctx, next } = opts;

    if (!id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
        ctx: {
            ...ctx,
        },
    });
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
                console.log("is this even running");
                const { email, password } = input;

                const exists = await (ctx as any).prisma.User.findFirst({
                    where: { email },
                });

                console.log("after calling the api ");
                console.log(exists);

                if (exists) {
                    throw new TRPCError({
                        code: "CONFLICT",
                        message: "User already exists.",
                    });
                }

                const _LifeGoalDocuments = [];

                console.log("abefo");

                const salt = randomBytes(8).toString("hex");
                const hash = (await scrypt(password, salt, 32)) as Buffer;
                const hashedPassword = `${salt}.${hash.toString("hex")}`;

                const result = await (ctx as any).prisma.User.create({
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

                console.log("=======end=============");

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
        .use(isUser)
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

            const [salt, storedHash] = user.password.split(".");
            const hash = (await scrypt(newEmailPassFiled, salt, 32)) as Buffer;

            if (hash.toString("hex") !== storedHash) {
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
        .use(isUser)
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

            const [salt, storedHash] = user.password.split(".");
            const hash = (await scrypt(oldPassword, salt, 32)) as Buffer;

            if (hash.toString("hex") !== storedHash) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "password is wrong",
                });
            }

            const _newSalt = randomBytes(8).toString("hex");
            const _newhHash = (await scrypt(newPassword, salt, 32)) as Buffer;
            const hashedNewPassword = `${salt}.${hash.toString("hex")}`;

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
        .use(isUser)
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

    getOneUser: t.procedure.use(isUser).query(async ({ ctx }) => {
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

    test: t.procedure.query(async ({ ctx }) => {
        return {
            test: "hello world",
        };
    }),

    getLifeGoals: t.procedure.use(isUser).query(async ({ ctx }) => {
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
        .use(isUser)
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
        .use(isUser)
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
        .use(isUser)
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
        .use(isUser)
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

            const session = await getServerSession(authOptions);
            const id = (session as any).id;

            try {
                // 1. find the given item by its ID
                const item = await (ctx as any).prisma.LifeGoals.findUnique({
                    where: {
                        id: source_id,
                        userId: id,
                    },
                });

                const source_chips = [...item.Chips];

                // 2. remove the item from source
                await (ctx as any).prisma.LifeGoals.updateMany({
                    where: {
                        id: source_id,
                        userId: id,
                    },
                    data: {
                        Chips: {
                            set: item.Chips.filter((val: any) => val?.id !== item_id),
                        },
                    },
                });

                // 4. read destination chips
                const lifeGoalDocument = await (ctx as any).prisma.LifeGoals.findUnique({
                    where: {
                        id: destination_id,
                        userId: id,
                    },
                });

                // 5. add the item to destination Document in given index
                const chips = [...lifeGoalDocument.Chips];

                const chip = source_chips.filter((_item: any) => _item.id === item_id);
                chips.splice(destination_index, 0, chip[0]);

                await (ctx as any).prisma.LifeGoals.update({
                    where: {
                        id: destination_id,
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

    getNotions: t.procedure.use(isUser).query(async ({ ctx }) => {
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
        .use(isUser)
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
                const notions = await (ctx as any).prisma.YearlyGoals.findMany({});

                const largestIndex = getLargestIndex(notions);

                const createResult = await (ctx as any).prisma.YearlyGoals.create({
                    data: {
                        userId: id,
                        title,
                        Tasks: [],
                        index: largestIndex + 1,
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

    updateNotionTitle: t.procedure
        .use(isUser)
        .input(
            z.object({
                id: z.string(),
                title: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id: notionId, title } = input;

            const session = await getServerSession(authOptions);
            const id = (session as any).id;

            try {
                const updateResult = await (ctx as any).prisma.YearlyGoals.update({
                    where: {
                        id: notionId,
                        userId: id,
                    },
                    data: {
                        title,
                    },
                });

                return updateResult;
            } catch (e) {
                console.log(e);

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "something went wrong. please try again late",
                });
            }
        }),

    createTask: t.procedure
        .use(isUser)
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
                const generateUniqueTaskId = uuidv4();
                await (ctx as any).prisma.YearlyGoals.update({
                    where: {
                        id: notionId,
                        userId: id,
                    },
                    data: {
                        Tasks: {
                            push: {
                                id: generateUniqueTaskId,
                                value,
                                isFavorite: false,
                                subTask: is_sub,
                                checked: false,
                                visible: false,
                            },
                        },
                    },
                });

                return {
                    id: generateUniqueTaskId,
                };
            } catch (e) {
                console.log(e);

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "something went wrong. please try again late",
                });
            }
        }),

    deleteTask: t.procedure
        .use(isUser)
        .input(
            z.object({
                notion_id: z.string(),
                task_id: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { notion_id, task_id } = input;

            const session = await getServerSession(authOptions);
            const id = (session as any).id;

            try {
                const notion = await (ctx as any).prisma.YearlyGoals.findUnique({
                    where: {
                        id: notion_id,
                        userId: id,
                    },
                });

                const tasks = notion.Tasks as NotionTask[];
                const filteredTasks = tasks.filter((task) => task.id !== task_id);

                const updateResult = await (ctx as any).prisma.YearlyGoals.update({
                    where: {
                        id: notion_id,
                        userId: id,
                    },
                    data: {
                        Tasks: {
                            set: filteredTasks,
                        },
                    },
                });

                return updateResult;
            } catch (e) {
                console.log(e);

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "something went wrong. please try again late",
                });
            }
        }),

    updateTaskChecked: t.procedure
        .use(isUser)
        .input(
            z.object({
                notion_id: z.string(),
                task_id: z.string(),
                status: z.boolean(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { notion_id, task_id, status } = input;

            const session = await getServerSession(authOptions);
            const id = (session as any).id;

            try {
                const notion = await (ctx as any).prisma.YearlyGoals.findUnique({
                    where: {
                        id: notion_id,
                        userId: id,
                    },
                });

                const modifiedTask = notion.Tasks.map((task: NotionTask) => {
                    if (task.id === task_id) {
                        task.checked = status;
                    }
                    return task;
                });

                const updateResult = await (ctx as any).prisma.YearlyGoals.update({
                    where: {
                        id: notion_id,
                        userId: id,
                    },
                    data: {
                        Tasks: {
                            set: modifiedTask,
                        },
                    },
                });

                return updateResult;
            } catch (e) {
                console.log(e);

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "something went wrong. please try again late",
                });
            }
        }),

    updateFavoriteStatus: t.procedure
        .use(isUser)
        .input(
            z.object({
                notion_id: z.string(),
                task_id: z.string(),
                status: z.boolean(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { notion_id, task_id, status } = input;

            const session = await getServerSession(authOptions);
            const id = (session as any).id;

            try {
                const notion = await (ctx as any).prisma.YearlyGoals.findUnique({
                    where: {
                        id: notion_id,
                        userId: id,
                    },
                });

                const modifiedTask = notion.Tasks.map((task: NotionTask) => {
                    if (task.id === task_id) {
                        task.isFavorite = status;
                    }
                    return task;
                });

                const updateResult = await (ctx as any).prisma.YearlyGoals.update({
                    where: {
                        id: notion_id,
                        userId: id,
                    },
                    data: {
                        Tasks: {
                            set: modifiedTask,
                        },
                    },
                });

                return updateResult;
            } catch (e) {
                console.log(e);

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "something went wrong. please try again late",
                });
            }
        }),

    updateTaskValue: t.procedure
        .use(isUser)
        .input(
            z.object({
                notion_id: z.string(),
                task_id: z.string(),
                value: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { notion_id, task_id, value } = input;

            const session = await getServerSession(authOptions);
            const id = (session as any).id;

            try {
                const notion = await (ctx as any).prisma.YearlyGoals.findUnique({
                    where: {
                        id: notion_id,
                        userId: id,
                    },
                });

                const modifiedTask = notion.Tasks.map((task: NotionTask) => {
                    if (task.id === task_id) {
                        task.value = value;
                    }
                    return task;
                });

                const updateResult = await (ctx as any).prisma.YearlyGoals.update({
                    where: {
                        id: notion_id,
                        userId: id,
                    },
                    data: {
                        Tasks: {
                            set: modifiedTask,
                        },
                    },
                });

                return updateResult;
            } catch (e) {
                console.log(e);

                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "something went wrong. please try again late",
                });
            }
        }),

    getPriorities: t.procedure.use(isUser).query(async ({ ctx }) => {
        try {
            const session = await getServerSession(authOptions);
            const id = (session as any).id;
            const priorities = await (ctx as any).prisma.Priorities.findMany({
                where: {
                    userId: id,
                },
            });

            return priorities;
        } catch (e) {
            console.log(e);
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "something went wrong. please try again late",
            });
        }
    }),

    createPriority: t.procedure
        .use(isUser)
        .input(
            z.object({
                notionId: z.string(),
                taskId: z.string(),
                value: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                const { notionId, taskId, value } = input;
                const session = await getServerSession(authOptions);
                const id = (session as any).id;

                const priorities = await (ctx as any).prisma.Priorities.findMany({});

                const largestIndex = getLargestIndex(priorities);

                const priority = await (ctx as any).prisma.Priorities.create({
                    data: {
                        notionId,
                        taskId,
                        value,
                        userId: id,
                        index: largestIndex + 1,
                    },
                });

                return priority;
            } catch (e) {
                console.log(e);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "something went wrong. please try again late",
                });
            }
        }),

    removePriority: t.procedure
        .use(isUser)
        .input(
            z.object({
                priorityId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                const { priorityId } = input;
                const session = await getServerSession(authOptions);
                const id = (session as any).id;

                await (ctx as any).prisma.Priorities.delete({
                    where: {
                        id: priorityId,
                        userId: id,
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

    updatePriority: t.procedure
        .use(isUser)
        .input(
            z.object({
                taskId: z.string(),
                value: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                const { taskId, value } = input;
                const session = await getServerSession(authOptions);
                const id = (session as any).id;

                await (ctx as any).prisma.Priorities.updateMany({
                    where: {
                        taskId,
                        userId: id,
                    },
                    data: {
                        value,
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

    updateNotionIndex: t.procedure
        .use(isUser)
        .input(
            z.object({
                from: z.number(),
                to: z.number(),
                sourceId: z.string(),
                destinationId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                const { from, to, sourceId, destinationId } = input;
                const session = await getServerSession(authOptions);
                const id = (session as any).id;

                /*
                    1. get the source item
                    2. get the destination item

                    ( handle swap index )
                    3. set to -> source item
                    4. set from -> destination item

                */

                await (ctx as any).prisma.YearlyGoals.update({
                    where: {
                        id: sourceId,
                        userId: id,
                    },
                    data: {
                        index: to,
                    },
                });

                await (ctx as any).prisma.YearlyGoals.update({
                    where: {
                        id: destinationId,
                        userId: id,
                    },
                    data: {
                        index: from,
                    },
                });

                // just something to return
                return {
                    from,
                    to,
                };
            } catch (e) {
                console.log(e);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "something went wrong. please try again late",
                });
            }
        }),

    updateNotionTasksIndex: t.procedure
        .use(isUser)
        .input(
            z.object({
                notionId: z.string(),
                tasks: z.any(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                const { notionId, tasks } = input;
                const session = await getServerSession(authOptions);
                const id = (session as any).id;

                const result = await (ctx as any).prisma.YearlyGoals.update({
                    where: {
                        id: notionId,
                        userId: id,
                    },
                    data: {
                        Tasks: {
                            set: tasks,
                        },
                    },
                });

                return result;
            } catch (e) {
                console.log(e);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "something went wrong. please try again late",
                });
            }
        }),

    updatePrioritiesIndex: t.procedure
        .use(isUser)
        .input(
            z.object({
                from: z.number(),
                to: z.number(),
                sourceId: z.string(),
                destinationId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                const { from, to, sourceId, destinationId } = input;
                const session = await getServerSession(authOptions);
                const id = (session as any).id;

                /*
                    1. get the source item
                    2. get the destination item

                    ( handle swap index )
                    3. set to -> source item
                    4. set from -> destination item

                */

                await (ctx as any).prisma.Priorities.update({
                    where: {
                        id: sourceId,
                        userId: id,
                    },
                    data: {
                        index: to,
                    },
                });

                await (ctx as any).prisma.Priorities.update({
                    where: {
                        id: destinationId,
                        userId: id,
                    },
                    data: {
                        index: from,
                    },
                });

                return {
                    from,
                    to,
                };
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
