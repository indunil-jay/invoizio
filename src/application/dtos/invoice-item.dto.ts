import { z } from "zod";

export const createInvoiceItemSchema = z.object({
  productName: z.string().min(1),
  quantity: z.number().int().positive().min(1),
  price: z.number().int().positive().min(1),
  taxRate: z.number().int().optional(),
  discountRate: z.number().int().optional(),
});

export type CreateInvoiceItemDTO = z.infer<typeof createInvoiceItemSchema>;
