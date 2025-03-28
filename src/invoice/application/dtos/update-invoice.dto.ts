import { updateInvoiceSchema } from "@/shared/validation-schemas/invoice/update-invoice-form-schema";
import { z } from "zod";

export type UpdateInvoiceDto = z.infer<typeof updateInvoiceSchema>;
