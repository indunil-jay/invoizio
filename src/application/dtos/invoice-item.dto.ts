import { z } from "zod";

export const createInvoiceItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().int().positive().min(1),
  price: z.coerce.number().positive().min(1),
  taxRate: z.coerce.number(),
  discountRate: z.coerce.number(),
});

export type CreateInvoiceItemDTO = z.infer<typeof createInvoiceItemSchema>;
