import { z } from "zod";

export const changePasswordFormSchema = z.object({
    currentPassword: z
        .string()
        .min(8, { message: "Password must contain at least 8 characters." }),
    newPassword: z.string().min(8, {
        message: "New Password must contain at least 8 characters.",
    }),
});
