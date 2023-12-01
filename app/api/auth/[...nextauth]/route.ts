import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
import { PrismaClient } from "@prisma/client";
import { loginSchema } from "../../../common/validation/auth";

import { scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

//new
import NextAuth from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: "SignIn",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "golden@gmail.com",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, request) => {
                const creds = await loginSchema.parseAsync(credentials);

                const user = await prisma.user.findFirst({
                    where: { email: creds.email },
                });

                if (!user) {
                    throw new Error("user or password is wrong");
                }

                const [salt, storedHash] = user.password.split(".");
                const hash = (await scrypt(creds.password, salt, 32)) as Buffer;

                console.log(storedHash);
                console.log(hash.toString("hex"));

                if (hash.toString("hex") !== storedHash) {
                    throw new Error("user or password is wrong");
                }

                return {
                    id: user.id,
                    email: user.email,
                    password: user.password,
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        // FacebookProvider({
        //   clientId: process.env.FACEBOOK_CLIENT_ID,
        //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        // }),
    ],
    // ...

    jwt: {
        secret: "super-secret",
        maxAge: 15 * 24 * 30 * 60, // 15 days
    },
    session: {
        strategy: "jwt",
    },

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }

            return token;
        },

        session: async ({ session, token }) => {
            if (token) {
                (session as any).id = token.id;
            }

            return session;
        },
    },

    //...
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
