import z from "zod";

export const signUpFormSchema = z
    .object({
        name: z
            .string()
            .min(3, {
                message: "User name must contain at least 3 characters",
            })
            .trim(),
        email: z.string().email({ message: "Invalid email address" }),
        password: z
            .string()
            .min(8, {
                message: "Password must contain at least 8 characters.",
            })
            .trim(),
        passwordConfirm: z
            .string({ message: "Confirm password is required." })
            .trim(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: "Passwords does not match.",
    });
