import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { v4 as uuid } from "uuid";
import { encode } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import client from "./authdb";

const adapter = MongoDBAdapter(client);

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter,
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await client.db().collection("users").findOne({
          email: credentials?.email,
        });

        if (!user) {
          throw new Error("No user found with the given email");
        }

        const isValidPassword = await bcrypt.compare(
          String(credentials?.password),
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name ?? null,
          email: user.email ?? null,
          image: user.image ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = uuid();
        if (!params.token.sub) {
          throw new Error("No userId in token");
        }
        if (!adapter || typeof adapter.createSession !== "function") {
          throw new Error("Adapter or createSession method is not defined");
        }
        const createdSession = await adapter?.createSession({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }
        return sessionToken;
      }
      return encode(params);
    },
  },
});
