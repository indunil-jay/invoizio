import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/drizzle";
import Credentials from "next-auth/providers/credentials";
import { getInjection } from "@/di/container";
import authConfig from "./auth.config";
import {
    strictSignInWithCredentialSchema,
    UsersCollectionDocument,
} from "./drizzle/schemas/user";
import envValidationSchema from "@/lib/env-validation-schema";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
    trustHost: true,
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,

    providers: [
        Google({
            clientId: envValidationSchema.AUTH_GOOGLE_ID,
            clientSecret: envValidationSchema.AUTH_GOOGLE_SECRET,
        }),
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

    events: {
        async linkAccount({ user }) {
            //mark verified user as when login with google
            if (user && user.id) {
                const userRepository = getInjection("IUserRepository");
                await userRepository.update(user.id, {
                    emailVerified: new Date(),
                });
            }
        },
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) token.sub = user.id;
            return token;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            return session;
        },

        async signIn({ user, credentials }) {
            //allow to login with providers
            if (!credentials) return true;

            //check email is verified or not
            let existingUser: UsersCollectionDocument | undefined = undefined;
            if (user && user.email) {
                const userRepository = getInjection("IUserRepository");
                existingUser = await userRepository.getByEmail(user.email);
                if (!existingUser) return false;
            }
            return existingUser?.emailVerified ? true : false;
        },
    },

    pages: {
        signIn: "/auth/sign-in",
        signOut: "/auth/sign-in",
        error: "/auth/error",
        newUser: "/dashboard",
    },
});
