import { injectable } from "inversify";
import { InvoicePaymentReminderSentEvent } from "../../domain/events/invoice-payment-reminder-sent.event";
import { getInjection } from "@/di/container";

export interface IInvoicePaymentReminderSentEventHandler {
    handle(event: InvoicePaymentReminderSentEvent): Promise<void>;
}

@injectable()
export class InvoicePaymentReminderSentEventHandler
    implements IInvoicePaymentReminderSentEventHandler
{
    async handle(event: InvoicePaymentReminderSentEvent): Promise<void> {
        const emailService = getInjection("IEmailService");
        const clientRepository = getInjection("IClientRepository");

        const client = await clientRepository.get(event.invoice.clientId);

        emailService.sendPaymentReminderEmail(client, event.invoice);
    }
}
