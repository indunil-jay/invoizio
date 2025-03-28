import { z } from "zod";
import { UserSchema } from "./user-response-type";
import { AddressSchema } from "./address-response-type";

export const BusinessSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    user: UserSchema,
    address: AddressSchema,
});

export type BusinessType = z.infer<typeof BusinessSchema>;
