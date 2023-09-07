import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";
import { PrismaClient } from "@prisma/client";
import { loginSchema } from "../../../common/validation/auth";

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
          return null;
        }

        const isValidPassword = verify(user.password, creds.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          password: user.password,
        };
      },
    }),
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

  pages: {
    signIn: "/",
    newUser: "/register",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
