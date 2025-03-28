import { z } from "zod";
import { BusinessSchema } from "./business-response-type";
import { InvoiceItemSchema } from "./invoice-item-response";
import { ClientSchema } from "./client-response-type";

export const InvoiceSchema = z.object({
    id: z.string(),
    issueDate: z.coerce.date(),
    dueDate: z.coerce.date(),
    description: z.string(),
    totalPrice: z.string(),
    totalBasePrice: z.string(),
    totalTax: z.string().nullable(),
    totalDiscount: z.string().nullable(),
    lastEmailSentAt: z.coerce.date().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    business: BusinessSchema,
    client: ClientSchema,
    status: z.object({ id: z.number().int(), status: z.string() }),
    invoiceItems: z.array(InvoiceItemSchema),
});

export type InvoiceType = z.infer<typeof InvoiceSchema>;
