import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
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
          throw new Error("user or password is wrong");
        }

        if (user.isSocialMedia) {
          throw new Error("you should login with socialMedia account");
        }

        const isValidPassword = await verify(user.password, creds.password);

        if (!isValidPassword) {
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
    //...
    async signIn({ user, account, profile, email, credentials }) {
      console.log(user, "user");
      console.log(account, "acc");
      console.log(profile, "profile");
      console.log(email, "email");
      console.log(credentials, "cred");

      if (user.email) {
        const exists = await prisma.user.findFirst({
          where: { email: user.email },
        });

        if (!exists) {
          const result = await prisma.user.create({
            data: { email: user.email, password: "", isSocialMedia: true },
          });

          const _LifeGoalDocuments = [];

          for (let i = 1; i <= 100; i++) {
            _LifeGoalDocuments.push({
              userId: result.id,
              age: i,
              Chips: [],
            });
          }

          await prisma.lifeGoals.createMany({
            data: _LifeGoalDocuments,
          });
        }
      }

      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },

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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
