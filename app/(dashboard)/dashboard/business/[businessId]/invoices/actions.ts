"use server";
import { z } from "zod";
import { executeAction } from "@/app/_utils/execute.action";
import { createInvoiceController } from "@/src/invoice/presenter/controllers/create-invoice.controller";
import { invoiceValidationSchema } from "@/shared/validation-schemas/invoice/invoice-validation-schema";
import { deleteInvoiceController } from "@/src/invoice/presenter/controllers/delete-invoice.controller";

export const createInvoice = (
    values: z.infer<typeof invoiceValidationSchema>
) =>
    executeAction({
        actionFn: async () => await createInvoiceController(values),
        successTitle: "Invoice Create Successfull",
        failureTitle: "Invoice Create Failure",
    });

export const deleteInvoice = (invoiceId: string) =>
    executeAction({
        actionFn: async () => await deleteInvoiceController(invoiceId),
        successTitle: "Invoice Delete Successfull",
        failureTitle: "Invoice Delete Failure",
    });
