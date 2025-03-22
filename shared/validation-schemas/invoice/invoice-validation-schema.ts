import { z } from "zod";
import { addressSchema } from "@/shared/validation-schemas/common/address-schema";
import { createInvoiceItemFormSchema } from "./create-invoice-item-form-schema";

export const invoiceValidationSchema = z.object({
    user: z.object({
        id: z.string(),
        email: z.string().email({ message: "Invalid email address" }),
    }),
    client: z.object({
        name: z.string().min(1, { message: "Client name is required." }),
        email: z.string().email({ message: "Invalid client email address" }),
        address: addressSchema,
    }),
    business: z.object({
        id: z.string(),
        name: z.string(),
        address: addressSchema,
    }),
    invoice: z.object({
        id: z.string().min(15, { message: "Invalid invoice ID." }),
        grandTotal: z
            .number()
            .min(0, { message: "Grand total cannot be negative." }),
        totalBasePrice: z
            .number()
            .min(0, { message: "Total base price cannot be negative." }),
        totalDiscount: z
            .number()
            .min(0, { message: "Total discount cannot be negative." }),
        totalTax: z
            .number()
            .min(0, { message: "Total tax cannot be negative." }),
        description: z.string().min(1, { message: "Description is required." }),
        issueDate: z.date({ message: "Issue date is required." }),
        dueDate: z.date({ message: "Due date is required." }),
    }),
    invoiceItems: z
        .array(createInvoiceItemFormSchema)
        .min(1, { message: "At least one product is required." }),
});
