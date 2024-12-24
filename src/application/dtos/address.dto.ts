import { z } from "zod";

export const createAddressSchema = z.object({
  addressLine1: z.string().trim().min(1, "Required"),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().min(1, "Required"),
  postalCode: z.string().trim().min(1, "Required"),
});

export type CreateAddressDTO = z.infer<typeof createAddressSchema>;
