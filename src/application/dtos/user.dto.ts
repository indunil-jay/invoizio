import { z } from "zod";

export const createUserDTOschema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1).min(8),
  name: z.string().min(1),
});

export type createUserDTO = z.infer<typeof createUserDTOschema>;
