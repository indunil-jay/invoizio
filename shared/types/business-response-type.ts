import { z } from "zod";
import { UserSchema } from "./user-response-type";

export const AddressSchema = z.object({
    id: z.string(),
    businessId: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string().nullable(),
    city: z.string(),
    postalCode: z.string(),
});

export const BusinessSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    user: UserSchema,
    address: AddressSchema,
});

export type BusinessType = z.infer<typeof BusinessSchema>;
