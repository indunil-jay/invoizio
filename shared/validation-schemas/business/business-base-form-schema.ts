import { z } from "zod";
import { addressSchema } from "@/shared/validation-schemas/common/address-schema";

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

    address: addressSchema,
});
