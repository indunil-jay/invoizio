"use server";
import { z } from "zod";
import { executeAction } from "@/app/_utils/execute.action";
import { createInvoiceController } from "@/src/invoice/presenter/controllers/create-invoice.controller";
import { invoiceValidationSchema } from "@/shared/validation-schemas/invoice/invoice-validation-schema";
import { deleteInvoiceController } from "@/src/invoice/presenter/controllers/delete-invoice.controller";
import { updateInvoiceStatusController } from "@/src/invoice/presenter/controllers/update-invoice-status.controller";
import { sendPaymentReminderController } from "@/src/invoice/presenter/controllers/send-payment-reminder.controller";
import { updateInvoiceController } from "@/src/invoice/presenter/controllers/update-invoice.controller";
import { updateInvoiceSchema } from "@/shared/validation-schemas/invoice/update-invoice-form-schema";

export const createInvoice = (
    values: z.infer<typeof invoiceValidationSchema>
) =>
    executeAction({
        actionFn: async () => await createInvoiceController(values),
        successTitle: "Invoice Create Successfull",
        failureTitle: "Invoice Create Failure",
    });

export const updateInvoice = (values: z.infer<typeof updateInvoiceSchema>) =>
    executeAction({
        actionFn: async () => await updateInvoiceController(values),
        successTitle: "Invoice update Successfull",
        failureTitle: "Invoice update Failure",
    });

export const deleteInvoice = (invoiceId: string) =>
    executeAction({
        actionFn: async () => await deleteInvoiceController(invoiceId),
        successTitle: "Invoice Delete Successfull",
        failureTitle: "Invoice Delete Failure",
    });

export const changeInvoiceStatus = (invoiceId: string, statusId: number) =>
    executeAction({
        actionFn: async () =>
            await updateInvoiceStatusController(invoiceId, statusId),
        successTitle: "Invoice Status Update Successfull",
        failureTitle: "Invoice Status Update Failure",
    });

export const sendPaymentReminder = (invoiceId: string) =>
    executeAction({
        actionFn: async () => await sendPaymentReminderController(invoiceId),
        successTitle: "Payment Reminder Sent Successfull",
        failureTitle: "Payment Reminder Sent Failure",
    });
