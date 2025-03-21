import { createInvoiceItemFormSchema } from "@/shared/validation-schemas/invoice/create-invoice-item-form-schema";
import { z } from "zod";

export type InvoiceItem = z.infer<typeof createInvoiceItemFormSchema>;
