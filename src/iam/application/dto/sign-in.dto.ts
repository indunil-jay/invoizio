import { signInFormSchema } from "@/shared/validation-schemas/auth/sign-in-form.schema";
import { z } from "zod";
export type signInDto = z.infer<typeof signInFormSchema>;
