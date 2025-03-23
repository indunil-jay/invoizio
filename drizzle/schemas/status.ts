import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { invoices } from "@/drizzle/schemas";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const statuses = pgTable("status", {
    id: serial("id").primaryKey().notNull(),
    status: text("status").notNull().unique(),
});

export const defineStatusesRelations = relations(statuses, ({ many, one }) => ({
    //one status has many invoices
    invoices: many(invoices),
}));

export const statusSchema = createInsertSchema(statuses, {
    status: (schema) => schema.min(1),
}).pick({
    status: true,
});

export type CreateStatusInput = z.infer<typeof statusSchema>;
export type UpdateStatusInput = z.infer<typeof statusSchema>;

export type StatusesCollectionDocument = InferSelectModel<typeof statuses>;
