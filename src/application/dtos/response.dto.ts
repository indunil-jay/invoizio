import { z } from "zod";

export const responseDTOschema = z.object({
  success: z.boolean(),
  message: z.string().min(1),
  redirectUrl: z.string().optional(),
});

export type ClientResponseDTO = z.infer<typeof responseDTOschema>;

export const createBusinessSchemaResponse = responseDTOschema.merge(
  z.object({
    id: z.string(),
  })
);

export type BusinessResponseDTO  = z.infer<typeof createBusinessSchemaResponse>