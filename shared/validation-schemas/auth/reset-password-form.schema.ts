import { z } from "zod";

export const resetPasswordFormSchema = z
    .object({
        password: z.string().min(8, {
            message: "Password must contain at least 8 characters.",
        }),
        passwordConfirm: z.string({ message: "Confirm password is required." }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: "Passwords does not match.",
    });
