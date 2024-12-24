import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { businesses } from "@/drizzle/schemas";

export const businessAddresses = pgTable("businessAddress", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  businessId: text("businessId").references(() => businesses.id, {
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

export const defineBusinessAddressesRelations = relations(
  businessAddresses,
  ({ one }) => ({
    //one address belongs to a one client
    businesses: one(businesses, {
      fields: [businessAddresses.businessId],
      references: [businesses.id],
    }),
  })
);

export const createBusinessAddressSchema = createInsertSchema(
  businessAddresses,
  {
    businessId: (schema) => schema.min(1),
    addressLine1: (schema) => schema.min(1),
    city: (schema) => schema.min(1),
    postalCode: (schema) =>
      schema.regex(/^\d{5}(-\d{4})?$/, "Invalid postal code"),
  }
).pick({
  businessId: true,
  addressLine1: true,
  addressLine2: true,
  city: true,
  postalCode: true,
});

export type CreateBusinessAddressInput = z.infer<
  typeof createBusinessAddressSchema
>;

export type BusinessAddressesCollectionDocument = InferSelectModel<
  typeof businessAddresses
>;

export type PartialUpdateBusinessAddressesCollectionDocument = Partial<
  Omit<BusinessAddressesCollectionDocument, "">
>;
