import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzle";

import Credentials from "next-auth/providers/credentials";
import { strictSignInWithCredentialSchema } from "../drizzle/schemas/user";
import { getInjection } from "@/di/container";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,

  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ token, session }) {
      console.log({ sessionToken: token });
      console.log({ session });

      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      console.log(user);
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
    error: "/error",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields =
          strictSignInWithCredentialSchema.safeParse(credentials);

        //validate input
        if (!validatedFields.success) return null;
        const { email, password } = validatedFields.data;

        //check if user exists
        const userRepository = getInjection("IUserRepository");
        const existingUser = await userRepository.getByEmail(email);
        if (!existingUser || !existingUser.password) return null;

        //check password is matching
        const hashingService = getInjection("IHashingService");
        const isValidPassword = await hashingService.compare(
          password,
          existingUser.password
        );

        return isValidPassword ? existingUser : null;
      },
    }),
  ],
});
