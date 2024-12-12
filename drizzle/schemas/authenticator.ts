import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";
import { users } from "@/drizzle/schemas";
import { InferSelectModel, relations } from "drizzle-orm";

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
  users: one(users, {
    fields: [authenticators.userId],
    references: [users.id],
  }),
}));

export type authenticatorsCollection = InferSelectModel<typeof authenticators>;
