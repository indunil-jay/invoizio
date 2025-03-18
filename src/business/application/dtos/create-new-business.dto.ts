import { z } from "zod";
import { createBusinessFormSchema } from "@/shared/validation-schemas/business/create-business-from-schema";

export type CreateBusinessDto = z.infer<typeof createBusinessFormSchema>;
