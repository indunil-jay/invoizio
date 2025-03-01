import { z } from "zod";
import { signUpFormSchema } from "@/shared/validation-schemas/auth/sign-up-form.schema";

export type signUpDto = z.infer<typeof signUpFormSchema>;
