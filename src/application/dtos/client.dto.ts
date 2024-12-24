import { z } from "zod";
import { createAddressSchema } from "./address.dto";

export const createClientSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  address: createAddressSchema,
});

export type CreateClientDTO = z.infer<typeof createClientSchema>;
