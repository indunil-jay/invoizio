import { InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const verificationTokens = pgTable(
    "verificationToken",
    {
        id: text("id").primaryKey().notNull(),
        email: text("email").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => [
        unique("verificationToken_email_token_unique").on(
            verificationToken.email,
            verificationToken.token
        ),
    ]
);

export const createTokenSchema = createInsertSchema(verificationTokens, {
    id: (schema) => schema.min(1),
    email: (schema) => schema.email(),
    token: (schema) => schema.min(1),
}).pick({
    id: true,
    email: true,
    token: true,
    expires: true,
});

export type CreateVerificationToken = z.infer<typeof createTokenSchema>;

export type VerificationTokenEntity = InferSelectModel<
    typeof verificationTokens
>;
