import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import {
    IInvoicePaymentReminderSentEventHandler,
    InvoicePaymentReminderSentEventHandler,
} from "@/src/invoice/application/handlers/invoice-payment-reminder-sent.event-handler";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IInvoicePaymentReminderSentEventHandler>(
        DI_SYMBOLS.IInvoicePaymentReminderSentEventHandler
    ).to(InvoicePaymentReminderSentEventHandler);
};

export const InvoicePaymentReminderSentEventHandlerModule = new ContainerModule(
    initializeModule
);
