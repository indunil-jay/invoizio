import {
    decimal,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { statuses, invoiceItems, businesses, clients } from "@/drizzle/schemas";

export const statusEnum = pgEnum("status", ["pending", "paid", "expired"]);

export const invoices = pgTable("invoice", {
    id: text("id").notNull().primaryKey(),
    clientId: text("clientId")
        .notNull()
        .references(() => clients.id),
    businessId: text("businessId")
        .notNull()
        .references(() => businesses.id, { onDelete: "cascade" }),
    issueDate: timestamp("issueDate", { mode: "date" }).notNull(),
    dueDate: timestamp("dueDate", { mode: "date" }).notNull(),
    description: text("description").notNull(),
    statusId: integer("statusId")
        .notNull()
        .references(() => statuses.id),

    totalPrice: decimal("totalPrice").notNull(),
    totalBasePrice: decimal("totalBasePrice").notNull(),
    totalTax: decimal("totalTax").notNull(),
    totalDiscount: decimal("totalDiscount").notNull(),

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
    id: (schema) => schema.min(1, "Invoice ID is required."),
    clientId: (schema) => schema.min(1, "Client ID is required."),
    businessId: (schema) => schema.min(1, "Business ID is required."),
    statusId: (schema) => schema.min(1, "Status ID is required."),
    description: (schema) => schema.min(1, "Description is required."),

    totalPrice: (schema) =>
        schema.refine((val) => +val >= 0, {
            message: "Total price must be a 0 or positive value.",
        }),
    totalBasePrice: (schema) =>
        schema.refine((val) => +val >= 0, {
            message: "Total  base price must be a 0 or positive value.",
        }),
    totalTax: (schema) =>
        schema.refine((val) => +val >= 0, {
            message: "Total tax must be a 0 or positive value.",
        }),
    totalDiscount: (schema) =>
        schema.refine((val) => +val >= 0, {
            message: "Total discount must be a 0 or positive value.",
        }),

    dueDate: (schema) =>
        schema.refine((val) => !isNaN(new Date(val).getTime()), {
            message: "Due date must be a valid date.",
        }),
    issueDate: (schema) =>
        schema.refine((val) => !isNaN(new Date(val).getTime()), {
            message: "Issue date must be a valid date.",
        }),
}).pick({
    id: true,
    clientId: true,
    businessId: true,
    statusId: true,
    description: true,
    dueDate: true,
    issueDate: true,
    totalDiscount: true,
    totalPrice: true,
    totalTax: true,
    totalBasePrice: true,
});

export type CreateInvoice = z.infer<typeof invoicesSchema>;

export type InvoiceEntity = InferSelectModel<typeof invoices>;
