import { InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const passwordResetTokens = pgTable(
    "passwordResetToken",
    {
        id: text("id").primaryKey().notNull(),
        email: text("email").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (passwordResetToken) => [
        unique("passwordResetToken_email_token_unique").on(
            passwordResetToken.email,
            passwordResetToken.token
        ),
    ]
);

export const passwordResetTokensSchema = createInsertSchema(
    passwordResetTokens,
    {
        id: (schema) => schema.min(1),
        email: (schema) => schema.email(),
        token: (schema) => schema.min(1),
    }
).pick({
    id: true,
    email: true,
    token: true,
    expires: true,
});

export type CreatePasswordResetToken = z.infer<
    typeof passwordResetTokensSchema
>;

export type PasswordResetTokenEntity = InferSelectModel<
    typeof passwordResetTokens
>;
