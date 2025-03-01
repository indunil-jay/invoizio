import { z } from "zod";

import { signUpFormSchema } from "@/shared/validation-schemas/auth/sign-up-form.schema";
import { signInFormSchema } from "@/shared/validation-schemas/auth/sign-in-form.schema";
import { forgotPasswordFormSchema } from "@/shared/validation-schemas/auth/forget-password-form.schema";
import { resetPasswordFormSchema } from "@/shared/validation-schemas/auth/reset-password-form.schema";

export type signUpDto = z.infer<typeof signUpFormSchema>;

export type signInDto = z.infer<typeof signInFormSchema>;

export type forgotPasswordDto = z.infer<typeof forgotPasswordFormSchema>;

export type resetPasswordDto = z.infer<typeof resetPasswordFormSchema>;
