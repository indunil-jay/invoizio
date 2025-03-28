import { z } from "zod";

export const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.coerce.date().nullable(),
    image: z.string().nullable(),
});

export type UserType = z.infer<typeof UserSchema>;
