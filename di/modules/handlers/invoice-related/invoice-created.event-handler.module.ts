import { DI_SYMBOLS } from "@/di/types";
import {
    IInvoiceCreatedEventHandler,
    InvoiceCreatedEventHandler,
} from "@/src/invoice/application/handlers/invoice-created.event-handler";
import { ContainerModule, interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IInvoiceCreatedEventHandler>(
        DI_SYMBOLS.IInvoiceCreatedEventHandler
    ).to(InvoiceCreatedEventHandler);
};

export const InvoiceCreatedEventHandlerModule = new ContainerModule(
    initializeModule
);
