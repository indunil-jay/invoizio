import { updateBusinessFormSchema } from "@/shared/validation-schemas/business/update-business-form-schema";
import { z } from "zod";

export type UpdateBusinessDto = z.infer<typeof updateBusinessFormSchema>;
