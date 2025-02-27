import z from "zod";

export const signInFormSchema = z.object({
    email: z.string().email().min(1, {
        message: "email is required.",
    }),
    password: z
        .string()
        .min(1, { message: "password is required." })
        .min(8, { message: "password must contain at least 8 characters." }),
});
