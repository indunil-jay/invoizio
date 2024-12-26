"use server";
import { executeAction } from "@/app/_lib/execute.action";
import { deleteInvoiceByIdController } from "@/src/interface-adapter/controllers/invoice/delete-invoice-by-id.controller";
import { updateInvoiceStatusByIdController } from "@/src/interface-adapter/controllers/invoice/update-invoice-status-by-id.controller";
import { INVOICE_STATUS } from "../../type";
import { sendClientPaymentReminderController } from "@/src/interface-adapter/controllers/invoice/send-client-payment-reminder.controller";

export const deleteInvoiceById = (invoiceId: string) => {
  return executeAction({
    actionFn: async () => await deleteInvoiceByIdController(invoiceId),
    title: "Delete a Invoice",
  });
};

export const updateInvoiceById = (
  invoiceId: string,
  status: INVOICE_STATUS
) => {
  return executeAction({
    actionFn: async () =>
      await updateInvoiceStatusByIdController(invoiceId, status),
    title: "Update Invoice Status",
  });
};

export const sendPaymentReminderEmail = (invoiceId: string) => {
  return executeAction({
    actionFn: async () => await sendClientPaymentReminderController(invoiceId),
    title: "Payment Reminder Email",
  });
};
