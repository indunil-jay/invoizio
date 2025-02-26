"use server";
import { executeAction } from "@/app/_utils/execute.action";
import { createInvoiceController } from "@/src/presenter/controllers/invoice/create-invoice.controller";

export const createNewInvoice = (values: unknown) => {
    return executeAction({
        actionFn: async () => await createInvoiceController(values),
        title: "Create New Business",
    });
};
