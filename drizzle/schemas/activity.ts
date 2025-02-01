import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { invoices, clients, businesses } from "@/drizzle/schemas";

// Activities Table
export const activities = pgTable("activities", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => crypto.randomUUID()),
    invoiceId: text("invoiceId")
        .notNull()
        .references(() => invoices.id, { onDelete: "cascade" }),
    clientId: text("clientId")
        .notNull()
        .references(() => clients.id, { onDelete: "cascade" }),
    businessId: text("businessId")
        .notNull()
        .references(() => businesses.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

// Define Relations for Activities Table
export const defineActivitiesRelations = relations(activities, ({ one }) => ({
    invoice: one(invoices, {
        fields: [activities.invoiceId],
        references: [invoices.id],
    }),
    client: one(clients, {
        fields: [activities.clientId],
        references: [clients.id],
    }),
    business: one(businesses, {
        fields: [activities.businessId],
        references: [businesses.id],
    }),
}));

// Zod Schema for Validations
export const activitiesSchema = createInsertSchema(activities, {
    id: (schema) => schema.min(1, "Activity ID is required."),
    invoiceId: (schema) => schema.min(1, "Invoice ID is required."),
    clientId: (schema) => schema.min(1, "Client ID is required."),
    businessId: (schema) => schema.min(1, "businessId ID is required."),
}).pick({
    id: true,
    invoiceId: true,
    clientId: true,
    businessId: true,
});

export type CreateActivityInput = z.infer<typeof activitiesSchema>;

export type ActivitiesCollectionDocument = InferSelectModel<typeof activities>;

export type DetailActivitiesCollectionDocument =
    ActivitiesCollectionDocument & {
        invoice: InferSelectModel<typeof invoices>;
        client: InferSelectModel<typeof clients>;
        business: InferSelectModel<typeof businesses>;
    };

export type PartialUpdateActivitiesCollectionDocument = Partial<
    Omit<ActivitiesCollectionDocument, "">
>;
