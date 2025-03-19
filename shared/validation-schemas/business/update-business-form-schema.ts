import { businessBaseSchema } from "@/shared/validation-schemas/business/business-base-form-schema";

export const updateBusinessFormSchema = businessBaseSchema.partial();
