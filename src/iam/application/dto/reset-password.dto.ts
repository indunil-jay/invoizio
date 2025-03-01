import { resetPasswordFormSchema } from "@/shared/validation-schemas/auth/reset-password-form.schema";
import { z } from "zod";
export type resetPasswordDto = z.infer<typeof resetPasswordFormSchema>;
