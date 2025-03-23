import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import {
    users,
    businessAddresses,
    businessProfileImages,
} from "@/drizzle/schemas";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const businesses = pgTable("business", {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "string" })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" })
        .notNull()
        .defaultNow(),
});

//define relations
export const defineBusinessRelations = relations(businesses, ({ one }) => ({
    //one business belong to one user
    user: one(users, {
        fields: [businesses.userId],
        references: [users.id],
    }),
    // One business has one address
    address: one(businessAddresses, {
        fields: [businesses.id],
        references: [businessAddresses.businessId],
    }),

    //one business has one image
    image: one(businessProfileImages, {
        fields: [businesses.id],
        references: [businessProfileImages.businessId],
    }),
}));

export const businessSchema = createInsertSchema(businesses, {
    id: (schema) => schema.min(1),
    name: (schema) => schema.min(1),
    userId: (schema) => schema.min(1),
}).pick({
    id: true,
    name: true,
    userId: true,
});

export type CreateBusiness = z.infer<typeof businessSchema>;

export type BusinessEntity = InferSelectModel<typeof businesses>;
