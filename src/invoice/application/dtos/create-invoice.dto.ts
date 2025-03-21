import { invoiceValidationSchema } from "@/shared/validation-schemas/invoice/invoice-validation-schema";
import { z } from "zod";

export type CreateInvoiceDto = z.infer<typeof invoiceValidationSchema>;
