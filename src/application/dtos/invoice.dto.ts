import { z } from "zod";
import { createClientSchema } from "./client.dto";
import { createInvoiceItemSchema } from "./invoice-item.dto";
import { createBusinessSchema } from "./business.dto";

export const createInvoiceSchema = z.object({
  client: createClientSchema,
  invoiceItems: z.array(createInvoiceItemSchema),
  business: createBusinessSchema,
  user: z.object({
    id: z.string().min(1),
    email: z.string().email().min(1),
  }),
  invoice: z.object({
    grandTotal: z.number().positive().min(1),
    totalBasePrice: z.number().positive().min(1),
    totalDiscount: z.number(),
    totalTax: z.number(),
    description: z.string().min(1),
    issueDate: z.coerce.date(),
    dueDate: z.coerce.date(),
  }),
});

export type CreateInvoiceDTO = z.infer<typeof createInvoiceSchema>;
