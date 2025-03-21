import { z } from "zod";
import { createInvoiceItemFormSchema } from "@/shared/validation-schemas/invoice/create-invoice-item-form-schema";
import { addressSchema } from "@/shared/validation-schemas/common/address-schema";

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
        address: addressSchema,
    }),
    client: z.object({
        name: z.string().min(1, { message: "Client name is required." }),
        email: z
            .string()
            .email({ message: "Please enter a valid client email address." }),
        address: addressSchema,
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
