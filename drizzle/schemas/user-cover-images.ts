import { pgTable, text } from "drizzle-orm/pg-core";
import { users } from "@/drizzle/schemas";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userCoverImages = pgTable("userCoverImage", {
    id: text("id").primaryKey().notNull(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    publicId: text("publicId").notNull(),
    size: text("size").notNull(),
    type: text("type").notNull(),
    mimeType: text("mimeType").notNull(),
});

export const defineUserCoverImagesRelations = relations(
    userCoverImages,
    ({ one }) => ({
        user: one(users, {
            fields: [userCoverImages.userId],
            references: [users.id],
        }),
    })
);

export const userCoverImageSchema = createInsertSchema(userCoverImages, {
    id: (schema) => schema.min(1),
    userId: (schema) => schema.min(1),
    url: (schema) => schema.min(1),
    publicId: (schema) => schema.min(1),
    size: (schema) => schema.min(1),
    type: (schema) => schema.min(1),
    mimeType: (schema) => schema.min(1),
}).pick({
    id: true,
    url: true,
    userId: true,
    publicId: true,
    size: true,
    type: true,
    mimeType: true,
});

export type CreateUserCoverImage = z.infer<typeof userCoverImageSchema>;

export type UserCoverImageEntity = InferSelectModel<typeof userCoverImages>;
