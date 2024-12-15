import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1).min(8),
  name: z.string().min(1),
});

export type CreateUserRequestDTO = z.infer<typeof createUserSchema>;

export const signInUserSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1).min(8),
});

export type SignInUserRequestDTO = z.infer<typeof signInUserSchema>;

export const passwordResetSchema = z.object({
  email: z.string().email(),
});

export type PasswordResetRequestDTO = z.infer<typeof passwordResetSchema>;

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must contain at least 8 characters." }),
    passwordConfirm: z.string().min(1),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords does not match.",
  });

export type CreateNewPasswordRequestDTO = z.infer<typeof newPasswordSchema>;
