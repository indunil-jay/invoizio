import { z } from "zod";
import { createAddressSchema } from "./address.dto";

export const createBusinessSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Required")
    .min(3, "Must be 3 or more characters"),
  image: z.union([
    z.instanceof(File),
    z
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .optional(),
  ]),
  address: createAddressSchema,
});

export type CreateBusinessDTO = z.infer<typeof createBusinessSchema>;

export const updateBusinessSchema = createBusinessSchema.partial();

export type UpdateBusinessDTO = z.infer<typeof updateBusinessSchema>;
