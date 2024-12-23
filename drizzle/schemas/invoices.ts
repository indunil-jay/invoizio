import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { clients } from "./client";
import { businesses } from "./business";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { invoiceItems } from "./invoice-items";
import { statuses } from "./status";

export const statusEnum = pgEnum("status", ["pending", "paid", "expired"]);

export const invoices = pgTable("invoice", {
  id: text("id").notNull().primaryKey(),
  clientId: text("clientId")
    .notNull()
    .references(() => clients.id),
  businessId: text("businessId")
    .notNull()
    .references(() => businesses.id),
  issueDate: timestamp("issueDate", { mode: "date" }).notNull(),
  dueDate: timestamp("dueDate", { mode: "date" }).notNull(),
  description: text("description").notNull(),
  statusId: integer("statusId")
    .notNull()
    .references(() => statuses.id),
  totalPrice: integer("totalPrice").notNull(),
  totalTax: integer("totalTax"),
  totalDiscount: integer("totalDiscount"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

export const defineInvoicesRelations = relations(invoices, ({ one, many }) => ({
  //one invoice belongs to one client
  client: one(clients, {
    fields: [invoices.clientId],
    references: [clients.id],
  }),
  //one invoice belongs to one business
  business: one(businesses, {
    fields: [invoices.businessId],
    references: [businesses.id],
  }),
  //one invoice has many invoice items
  invoiceItems: many(invoiceItems),
  //one invoice has one status at a time
  status: one(statuses, {
    fields: [invoices.statusId],
    references: [statuses.id],
  }),
}));

export const invoicesSchema = createInsertSchema(invoices, {
  id: (schema) => schema.min(1),
  clientId: (schema) => schema.min(1),
  businessId: (schema) => schema.min(1),
  description: (schema) => schema.min(1),
}).pick({
  id: true,
  clientId: true,
  businessId: true,
  description: true,
  dueDate: true,
  issueDate: true,
});

export type CreateInvoicesInput = z.infer<typeof invoicesSchema>;

export type InvoicesCollectionDocument = InferSelectModel<typeof invoices>;

export type PartialUpdateInvoicesCollectionDocument = Partial<
  Omit<InvoicesCollectionDocument, "">
>;
