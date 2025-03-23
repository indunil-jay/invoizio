import { z } from "zod";
import { updateBusinessFormSchema } from "@/shared/validation-schemas/business/update-business-form-schema";

export type UpdateBusinessDto = z.infer<typeof updateBusinessFormSchema>;
