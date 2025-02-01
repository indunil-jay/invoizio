import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { clientAddresses, invoices } from "@/drizzle/schemas";

export const clients = pgTable("client", {
    id: text("id")
        .notNull()
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

//define relations
export const defineClientRelations = relations(clients, ({ many }) => ({
    clientAddresses: many(clientAddresses),
    invoices: many(invoices),
}));

export const clientSchema = createInsertSchema(clients, {
    name: (schema) => schema.min(1),
    email: (schema) => schema.min(1).email(),
}).pick({
    name: true,
    email: true,
});

export type CreateClientInput = z.infer<typeof clientSchema>;

export type ClientsCollectionDocument = InferSelectModel<typeof clients>;

export type ClientsCollectionWithAddressDocument = ClientsCollectionDocument & {
    clientAddresses: InferSelectModel<typeof clientAddresses>[];
};

export type PartialUpdateClientsCollectionDocument = Partial<
    Omit<ClientsCollectionDocument, "id">
>;
