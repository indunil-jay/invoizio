import { z } from "zod";

export const AddressSchema = z.object({
    id: z.string(),
    addressLine1: z.string(),
    city: z.string(),
    postalCode: z.string(),
    addressLine2: z.string().nullable().optional(),
});

export const ClientSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    address: AddressSchema,
});

export type ClientType = z.infer<typeof ClientSchema>;
