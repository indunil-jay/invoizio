import { z } from "zod";

export const createInvoiceItemFormSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Product name is required and cannot be empty." }),
    quantity: z.coerce
        .number()
        .min(1, {
            message:
                "Quantity must be a positive integer greater than or equal to 1.",
        })
        .refine((val) => val >= 0, {
            message: "Quantity must be a non-negative number.",
        }),
    price: z.coerce
        .number()
        .min(1, { message: "Price must be a positive value." })
        .refine((val) => val >= 0, {
            message: "Price must be a non-negative value.",
        }),
    taxRate: z.coerce
        .number()
        .optional()
        .default(0)
        .refine((val) => val >= 0 && val <= 100, {
            message: "Tax rate must be a value between 0% and 100%.",
        }),
    discountRate: z.coerce
        .number()
        .optional()
        .default(0)
        .refine((val) => val >= 0 && val <= 100, {
            message: "discount must be a value between 0% and 100%.",
        }),
});
