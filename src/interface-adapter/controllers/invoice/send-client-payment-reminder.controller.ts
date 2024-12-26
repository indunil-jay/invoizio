import { BadRequestError } from "@/src/application/errors/errors";
import { sendClientPaymentReminderUseCase } from "@/src/application/use-cases/invoices/send-client-payment-reminder.use-case";

export const sendClientPaymentReminderController = async (
  invoiceId: string
) => {
  if (!invoiceId) {
    throw new BadRequestError(
      "invoiceId is missing please check and try again."
    );
  }

  return await sendClientPaymentReminderUseCase.execute(invoiceId);
};
