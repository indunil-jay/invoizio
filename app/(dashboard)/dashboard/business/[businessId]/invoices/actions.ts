"use server";
import { z } from "zod";
import { executeAction } from "@/app/_utils/execute.action";
import { createInvoiceController } from "@/src/invoice/presenter/controllers/create-invoice.controller";
import { createInvoiceSchema } from "@/shared/validation-schemas/invoice/create-invoice-form-schema";

export const createInvoice = (values: z.infer<typeof createInvoiceSchema>) =>
    executeAction({
        actionFn: async () => await createInvoiceController(values),
    });
