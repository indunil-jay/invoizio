import { InferSelectModel } from "drizzle-orm";
import { pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
export const passwordResetTokens = pgTable(
  "passwordResetToken",
  {
    id: text("id")
      .primaryKey()
      .notNull()
      .$defaultFn(() => crypto.randomUUID()),
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
  passwordResetTokens
).pick({
  email: true,
  token: true,
  expires: true,
});

export type PasswordResetToken = z.infer<typeof passwordResetTokensSchema>;

export type PasswordResetTokenCollectionDocument = InferSelectModel<
  typeof passwordResetTokens
>;
