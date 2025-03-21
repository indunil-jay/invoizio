import { z } from "zod";

export const addressSchema = z.object({
    addressLine1: z.string().min(1, { message: "Address line 1 is required." }),
    addressLine2: z.string().optional().nullable(),
    city: z.string().min(1, { message: "City is required." }),
    postalCode: z
        .string()
        .min(1, { message: "Postal Code is required" })
        .refine((val) => (val ? /^\d{5,6}$/.test(val.toString()) : true), {
            message: "Postal code must be a valid 5-6 digit number.",
        }),
});
