"use server";
import { executeAction } from "@/app/_utils/execute.action";
import { deleteInvoiceByIdController } from "@/src/presenter/controllers/invoice/delete-invoice-by-id.controller";
import { updateInvoiceStatusByIdController } from "@/src/presenter/controllers/invoice/update-invoice-status-by-id.controller";
import { INVOICE_STATUS } from "../../type";
import { sendClientPaymentReminderController } from "@/src/presenter/controllers/invoice/send-client-payment-reminder.controller";
import { updateInvoiceController } from "@/src/presenter/controllers/invoice/update-invoice.controller";

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
        actionFn: async () =>
            await sendClientPaymentReminderController(invoiceId),
        title: "Payment Reminder Email",
    });
};

export const updateInvoice = (data: unknown) => {
    console.log("ACTION", data);
    return executeAction({
        actionFn: async () => await updateInvoiceController(data),
        title: "Update Invoice ",
    });
};
