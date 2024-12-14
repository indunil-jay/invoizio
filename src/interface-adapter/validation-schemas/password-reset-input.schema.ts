import { z } from "zod";

export const passwordResetInputSchema = z.object({
  email: z.string().email(),
});

export type PasswordResetInput = z.infer<typeof passwordResetInputSchema>;

export const newPasswordInputSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters." }),
    passwordConfirm: z.string().min(1),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords does not match.",
  });

export type NewPasswordInput = z.infer<typeof newPasswordInputSchema>;