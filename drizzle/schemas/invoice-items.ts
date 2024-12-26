import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { invoices } from "@/drizzle/schemas";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const invoiceItems = pgTable("invoice_items", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  invoiceId: text("invoiceId")
    .notNull()
    .references(() => invoices.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price").notNull(),
  taxRate: decimal("taxRate"),
  discountRate: decimal("discountRate"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

//define relations
export const defineInvoiceItemsRelations = relations(
  invoiceItems,
  ({ one }) => ({
    //one invoice-items belongs to one invoice
    invoices: one(invoices, {
      fields: [invoiceItems.invoiceId],
      references: [invoices.id],
    }),
  })
);

export const invoiceItemsSchema = createInsertSchema(invoiceItems, {
  invoiceId: (schema) =>
    schema.min(1, "Invoice ID is required and must be a positive integer."),
  name: (schema) =>
    schema.min(1, "Product name is required and cannot be empty."),
  quantity: (schema) => schema.min(1, "Quantity must be at least 1."),
  price: (schema) =>
    schema.refine((value) => +value > 0, {
      message: "Price must be a positive number greater than 0.",
    }),
  taxRate: (schema) => schema.min(0, "Tax rate must be a non-negative number."),
  discountRate: (schema) =>
    schema.min(0, "Discount rate must be a non-negative number."),
}).pick({
  invoiceId: true,
  name: true,
  quantity: true,
  price: true,
  taxRate: true,
  discountRate: true,
});

export type CreateInvoiceItemsInput = z.infer<typeof invoiceItemsSchema>;
export type UpdateInvoiceItemsInput = Partial<
  z.infer<typeof invoiceItemsSchema>
>;
export type InvoiceItemsCollectionDocument = InferSelectModel<
  typeof invoiceItems
>;
