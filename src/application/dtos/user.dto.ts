import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1).min(8),
  name: z.string().min(1),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

export const signInUserSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1).min(8),
});

export type SignInUserDTO = z.infer<typeof signInUserSchema>;

export const passwordResetSchema = z.object({
  email: z.string().email(),
});

export type PasswordResetDTO = z.infer<typeof passwordResetSchema>;

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "password does not contain at least 8 characters." }),
    passwordConfirm: z.string().min(1),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "passwords does not match.",
  });

export type CreateNewPasswordDTO = z.infer<typeof newPasswordSchema>;

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1).min(8, {
    message: "current password doest not contain at least 8 characters.",
  }),
  newPassword: z.string().min(1).min(8, {
    message: "new password doest not contain at least 8 characters.",
  }),
});

export type UpdatePasswordDTO = z.infer<typeof updatePasswordSchema>;

export const updateUserProfileSchema = z
  .object({
    email: z.string().email().min(1),
    name: z.string().min(1),
  })
  .partial();

export type UpdateUserProfileDTO = z.infer<typeof updateUserProfileSchema>;
