import { z } from "zod";

import { signUpFormSchema } from "@/shared/validation-schemas/auth/sign-up-form.schema";
import { signUpSchema } from "@/drizzle/schemas/user";
import { signInFormSchema } from "@/shared/validation-schemas/auth/sign-in-form.schema";
import { forgotPasswordFormSchema } from "@/shared/validation-schemas/auth/forget-password-form.schema";

export type signUpDto = z.infer<typeof signUpFormSchema>;

export type signInDto = z.infer<typeof signInFormSchema>;

export type forgotPasswordDto = z.infer<typeof forgotPasswordFormSchema>;

export type CreateUser = z.infer<typeof signUpSchema>;
