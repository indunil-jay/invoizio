import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
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
    .references(() => invoices.id),
  productName: text("name").notNull(),
  quantity: integer("quantity").notNull(),
  price: integer("price").notNull(),
  taxRate: integer("taxRate"),
  discountRate: integer("discountRate"),
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
  invoiceId: (schema) => schema.min(1),
  productName: (schema) => schema.min(1),
  quantity: (schema) => schema.min(1),
  price: (schema) => schema.min(1),
}).pick({
  invoiceId: true,
  productName: true,
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
