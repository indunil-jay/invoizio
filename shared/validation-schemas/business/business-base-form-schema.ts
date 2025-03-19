import { z } from "zod";

export const businessBaseSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, { message: "Business name is required." })
        .min(3, {
            message: "Business name must be at least 3 characters long.",
        }),

    image: z.union([
        z.instanceof(File, {
            message: "Uploaded file must be a valid image file.",
        }),
        z
            .string()
            .transform((value) => (value === "" ? undefined : value))
            .optional()
            .refine(
                (value) => value === undefined || value.startsWith("http"),
                {
                    message: "Image URL must be valid or empty.",
                }
            ),
    ]),

    address: z.object({
        addressLine1: z
            .string()
            .min(1, { message: "Address Line 1 is required." }),
        addressLine2: z.string().optional(),
        city: z
            .string()
            .min(1, { message: "City is required." })
            .max(100, { message: "City must be 100 characters or less." }),
        postalCode: z
            .string()
            .min(1, { message: "Postal code is required." })
            .refine((val) => (val ? /^\d{5,6}$/.test(val.toString()) : true), {
                message: "Postal code must be a valid 5-6 digit number.",
            }),
    }),
});
