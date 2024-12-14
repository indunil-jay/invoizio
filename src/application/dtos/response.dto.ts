import { z } from "zod";

export const responseDTOschema = z.object({
  success: z.boolean(),
  message: z.string().min(1),
});

export type ResponseDTO = z.infer<typeof responseDTOschema>;
