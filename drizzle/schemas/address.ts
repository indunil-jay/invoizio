import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { clients } from "./client";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const addresses = pgTable("address", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  clientId: text("clientId")
    .notNull()
    .references(() => clients.id, { onDelete: "cascade" }),

  addressLine1: text("addressLine1").notNull(),
  addressLine2: text("addressLine2"),
  city: text("city").notNull(),
  postalCode: text("postalCode").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

//define relations

export const defineAddressesRelations = relations(addresses, ({ one }) => ({
  //one address belongs to a one client
  client: one(clients, {
    fields: [addresses.clientId],
    references: [clients.id],
  }),
}));

export const createAddressSchema = createInsertSchema(addresses, {
  clientId: (schema) => schema.min(1),
  addressLine1: (schema) => schema.min(1),
  city: (schema) => schema.min(1),
  postalCode: (schema) => schema.min(1),
}).pick({
  clientId: true,
  addressLine1: true,
  addressLine2: true,
  city: true,
  postalCode: true,
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>;

export type AddressesCollectionDocument = InferSelectModel<typeof addresses>;

export type PartialUpdateAddressesCollectionDocument = Partial<
  Omit<AddressesCollectionDocument, "id">
>;
