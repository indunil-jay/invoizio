import { forgotPasswordFormSchema } from "@/shared/validation-schemas/auth/forget-password-form.schema";
import { z } from "zod";
export type forgotPasswordDto = z.infer<typeof forgotPasswordFormSchema>;
