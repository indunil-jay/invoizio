import { z } from "zod";
import { changePasswordFormSchema } from "@/shared/validation-schemas/account/change-password-form-schema";
export type changePasswordDto = z.infer<typeof changePasswordFormSchema>;
