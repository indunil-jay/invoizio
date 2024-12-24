import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { clients } from "@/drizzle/schemas";
import { z } from "zod";

export const clientAddresses = pgTable("clientAddress", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  clientId: text("clientId").references(() => clients.id, {
    onDelete: "cascade",
  }),

  addressLine1: text("addressLine1").notNull(),
  addressLine2: text("addressLine2"),
  city: text("city").notNull(),
  postalCode: text("postalCode").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

//define relations

export const defineClientAddressesRelations = relations(
  clientAddresses,
  ({ one }) => ({
    //one address belongs to a one client
    client: one(clients, {
      fields: [clientAddresses.clientId],
      references: [clients.id],
    }),
  })
);

export const createClientAddressSchema = createInsertSchema(clientAddresses, {
  clientId: (schema) => schema.min(1),
  addressLine1: (schema) => schema.min(1),
  city: (schema) => schema.min(1),
  postalCode: (schema) =>
    schema.regex(/^\d{5}(-\d{4})?$/, "Invalid postal code"),
}).pick({
  clientId: true,
  addressLine1: true,
  addressLine2: true,
  city: true,
  postalCode: true,
});

export type CreateClientAddressInput = z.infer<
  typeof createClientAddressSchema
>;

export type ClientAddressesCollectionDocument = InferSelectModel<
  typeof clientAddresses
>;

export type PartialUpdateClientAddressesCollectionDocument = Partial<
  Omit<ClientAddressesCollectionDocument, "id">
>;
