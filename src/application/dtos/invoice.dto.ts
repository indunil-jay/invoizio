import { z } from "zod";
import { createClientSchema } from "./client.dto";
import { createInvoiceItemSchema } from "./invoice-item.dto";
import { createAddressSchema } from "./address.dto";

export const createInvoiceSchema = z.object({
  client: createClientSchema,
  invoiceItems: z.array(createInvoiceItemSchema),
  business: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    address: createAddressSchema,
  }),
  user: z.object({
    id: z.string().min(1),
    email: z.string().email().min(1),
  }),
  invoice: z.object({
    id: z.string().min(1),
    grandTotal: z.coerce.number().positive().min(1),
    totalBasePrice: z.coerce.number().positive().min(1),
    totalDiscount: z.coerce.number(),
    totalTax: z.coerce.number(),
    description: z.string().min(1),
    issueDate: z.coerce.date(),
    dueDate: z.coerce.date(),
  }),
});

export type CreateInvoiceDTO = z.infer<typeof createInvoiceSchema>;
