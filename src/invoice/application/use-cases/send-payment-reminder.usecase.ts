import { getInjection } from "@/di/container";
import { InvoiceNotFoundException } from "../execeptions/specific.exception";
import { InvoicePaymentReminderSentEvent } from "../../domain/events/invoice-payment-reminder-sent.event";

export const sendPaymentReminderUseCase = {
    async execute(invoiceId: string) {
        const { authenticationService, invoiceRepository, eventBus } =
            this.getServices();
        await authenticationService.verifySessionUser();

        const invoice = await invoiceRepository.get(invoiceId);

        if (!invoice) {
            throw new InvoiceNotFoundException();
        }

        await invoiceRepository.update(invoiceId, {
            lastEmailSentAt: new Date(),
        });
        await eventBus.publish(new InvoicePaymentReminderSentEvent(invoice));
    },
    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            invoiceRepository: getInjection("IInvoiceRepository"),
            eventBus: getInjection("IEventBus"),
        };
    },
};
