import { BadRequestException } from "@/src/shared/presenter/exceptions/common.exceptions";
import { sendPaymentReminderUseCase } from "@/src/invoice/application/use-cases/send-payment-reminder.usecase";

const presenter = () => {
    return {
        status: true,
        message:
            "Payment reminder email has been successfully sent to the client.",
        data: null,
    };
};

export const sendPaymentReminderController = async (invoiceId: string) => {
    if (!invoiceId || typeof invoiceId !== "string") {
        throw new BadRequestException();
    }
    await sendPaymentReminderUseCase.execute(invoiceId);
    return presenter();
};
