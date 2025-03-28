import { z } from "zod";

export const InvoiceItemSchema = z.object({
    id: z.string().uuid(),
    invoiceId: z.string(),
    name: z.string(),
    quantity: z.number().int(),
    price: z.union([z.string(), z.number()]),
    taxRate: z.union([z.string().nullable(), z.number().nullable()]),
    discountRate: z.union([z.string().nullable(), z.number().nullable()]),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export type InvoiceItem = z.infer<typeof InvoiceItemSchema>;
