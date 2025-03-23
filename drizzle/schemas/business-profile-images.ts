import { pgTable, text } from "drizzle-orm/pg-core";
import { businesses } from "@/drizzle/schemas";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const businessProfileImages = pgTable("businessProfileImage", {
    id: text("id").primaryKey().notNull(),
    businessId: text("businessId")
        .notNull()
        .references(() => businesses.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    publicId: text("publicId").notNull(),
    size: text("size").notNull(),
    type: text("type").notNull(),
    mimeType: text("mimeType").notNull(),
});

export const defineBusniessProfileImagesRelations = relations(
    businessProfileImages,
    ({ one }) => ({
        user: one(businesses, {
            fields: [businessProfileImages.businessId],
            references: [businesses.id],
        }),
    })
);

export const businessProfileImageSchema = createInsertSchema(
    businessProfileImages,
    {
        id: (schema) => schema.min(1),
        businessId: (schema) => schema.min(1),
        url: (schema) => schema.min(1),
        publicId: (schema) => schema.min(1),
        size: (schema) => schema.min(1),
        type: (schema) => schema.min(1),
        mimeType: (schema) => schema.min(1),
    }
).pick({
    id: true,
    url: true,
    businessId: true,
    publicId: true,
    size: true,
    type: true,
    mimeType: true,
});

export type CreateBusinessProfileImage = z.infer<
    typeof businessProfileImageSchema
>;

export type BusinessProfileImageEntity = InferSelectModel<
    typeof businessProfileImages
>;
