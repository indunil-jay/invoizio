"use server";
import { z } from "zod";
import { executeAction } from "@/app/_utils/execute.action";
import { createInvoiceController } from "@/src/invoice/presenter/controllers/create-invoice.controller";
import { invoiceValidationSchema } from "@/shared/validation-schemas/invoice/invoice-validation-schema";

export const createInvoice = (
    values: z.infer<typeof invoiceValidationSchema>
) =>
    executeAction({
        actionFn: async () => await createInvoiceController(values),
    });
