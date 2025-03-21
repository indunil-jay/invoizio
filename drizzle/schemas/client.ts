import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { clientAddresses, invoices } from "@/drizzle/schemas";

export const clients = pgTable("client", {
    id: text("id").notNull().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

//define relations
export const defineClientRelations = relations(clients, ({ many, one }) => ({
    clientAddresses: one(clientAddresses),
    invoices: many(invoices),
}));

export const clientSchema = createInsertSchema(clients, {
    id: (schema) => schema.min(1),
    name: (schema) => schema.min(1),
    email: (schema) => schema.min(1).email(),
}).pick({
    name: true,
    email: true,
    id: true,
});

export type CreateClient = z.infer<typeof clientSchema>;

export type ClientEntity = InferSelectModel<typeof clients>;
