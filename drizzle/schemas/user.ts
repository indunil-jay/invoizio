import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { accounts, authenticators, businesses } from "@/drizzle/schemas";

export const users = pgTable("user", {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),

    password: text("password"),

    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

//define relation here
export const defineUsersRelations = relations(users, ({ one, many }) => ({
    //one user has one account
    accounts: one(accounts),
    authenticators: one(authenticators),
    //one user has many business
    businesses: many(businesses),
}));

//schema validation
export const signInWithCredentialSchema = createInsertSchema(users, {
    email: (schema) => schema.email().trim(),
    password: (schema) => schema.min(1).trim(),
}).pick({
    email: true,
    password: true,
});

// export type SignInInput = z.infer<typeof signInWithCredentialSchema>;

export const signUpSchema = createInsertSchema(users, {
    id: (schema) => schema.min(1),
    name: (schema) => schema.min(1).transform((value) => value.trim()),
    email: (schema) => schema.email().transform((value) => value.toLowerCase()),
    password: (schema) => schema.min(1),
}).pick({
    id: true,
    email: true,
    password: true,
    name: true,
});

// Inferred Input Type for SignUp
export type CreateUser = z.infer<typeof signUpSchema>;

// Select Model Type for User
export type UserEntity = InferSelectModel<typeof users>;
