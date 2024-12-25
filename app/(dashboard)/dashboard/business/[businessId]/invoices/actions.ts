"use server";
import { executeAction } from "@/app/_lib/execute.action";
import { deleteInvoiceByIdController } from "@/src/interface-adapter/controllers/invoice/delete-invoice-by-id.controller";

export const deleteInvoiceById = (invoiceId: string) => {
  return executeAction({
    actionFn: async () => await deleteInvoiceByIdController(invoiceId),
    title: "Delete a Invoice",
  });
};
