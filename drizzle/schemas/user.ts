import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { accounts, authenticators } from "@/drizzle/schemas";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),

  password: text("password"),

  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

//define relation here
export const usersRelations = relations(users, ({ one }) => ({
  //one user has one account
  accounts: one(accounts),
  authenticators: one(authenticators),
}));

//schema validation
export const signInWithCredentialSchema = createInsertSchema(users, {
  email: (schema) => schema.email(),
  password: (schema) => schema.min(1),
}).pick({
  email: true,
  password: true,
});

// Transform parsed output
export const strictSignInWithCredentialSchema =
  signInWithCredentialSchema.transform((data) => {
    return {
      ...data,
      email: data.email || "",
      password: data.password || "",
    };
  });

export type SignInInput = z.infer<typeof strictSignInWithCredentialSchema>;

export const signUpSchema = createInsertSchema(users, {
  name: (schema) => schema.min(1).transform((value) => value.trim()),
  email: (schema) => schema.email().transform((value) => value.toLowerCase()),
  password: (schema) => schema.min(1),
}).pick({
  email: true,
  password: true,
  name: true,
});

// Transform parsed output
export const strictSignUpSchema = signUpSchema.transform((data) => {
  return {
    ...data,
    name: data.name || "",
    email: data.email || "",
    password: data.password || "",
  };
});

export type SignUpInput = z.infer<typeof strictSignUpSchema>;

export type UsersCollectionDocument = InferSelectModel<typeof users>;
