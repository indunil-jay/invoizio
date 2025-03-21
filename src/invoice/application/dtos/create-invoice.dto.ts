import { createInvoiceSchema } from "@/shared/validation-schemas/invoice/create-invoice-form-schema";
import { z } from "zod";

export type CreateInvoiceDto = z.infer<typeof createInvoiceSchema>;
