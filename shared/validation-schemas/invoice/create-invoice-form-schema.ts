import { z } from "zod";
import { createInvoiceItemFormSchema } from "./create-invoice-item-form-schema";

const addressFormSchema = z.object({
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

export const createInvoiceSchema = z.object({
    user: z.object({
        id: z.string(),
        email: z
            .string()
            .email({ message: "Please enter a valid email address." }),
    }),
    business: z.object({
        id: z.string(),
        name: z.string(),
        address: addressFormSchema,
    }),
    client: z.object({
        name: z.string().min(1, { message: "Client name is required." }),
        email: z
            .string()
            .email({ message: "Please enter a valid client email address." }),
        address: addressFormSchema,
    }),
    invoice: z.object({
        issueDate: z.date({ message: "Issue date is required." }),
        dueDate: z.date({ message: "Due date is required." }),
        description: z.string().min(1, { message: "Description is required." }),
    }),
    invoiceItems: z
        .array(createInvoiceItemFormSchema)
        .min(1, { message: "At least one product is required." }),
});
