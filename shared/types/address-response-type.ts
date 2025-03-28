import { z } from "zod";

export const AddressSchema = z.object({
    addressLine1: z.string(),
    addressLine2: z.string().nullable(),
    city: z.string(),
    postalCode: z.string(),
});

export type AddressType = z.infer<typeof AddressSchema>;
