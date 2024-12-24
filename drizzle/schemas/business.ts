import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users, invoices, businessAddresses } from "@/drizzle/schemas";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const businesses = pgTable("business", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  image: text("image"),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
});

//define relations
export const defineBusinessRelations = relations(
  businesses,
  ({ one, many }) => ({
    //one business belong to one user
    users: one(users, {
      fields: [businesses.userId],
      references: [users.id],
    }),
    // One business has one address
    address: one(businessAddresses, {
      fields: [businesses.id],
      references: [businessAddresses.businessId],
    }),
    invoices: many(invoices),
  })
);

export const businessSchema = createInsertSchema(businesses, {
  name: (schema) => schema.min(1),
  userId: (schema) => schema.min(1),
}).pick({
  name: true,
  userId: true,
  image: true,
});

export type InsertBusinessSchema = z.infer<typeof businessSchema>;
export type UpdateBusinessSchema = Partial<z.infer<typeof businessSchema>>;

export type BusinessCollectionDocument = InferSelectModel<typeof businesses>;

export type BusinessCollectionWithAddressDocument =
  BusinessCollectionDocument & {
    address: InferSelectModel<typeof businessAddresses>;
  };
