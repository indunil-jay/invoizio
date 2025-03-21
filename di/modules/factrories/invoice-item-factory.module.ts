import { DI_SYMBOLS } from "@/di/types";
import {
    IInvoiceItemFactory,
    InvoiceItemFactory,
} from "@/src/invoice/domain/factories/invoice-item.factory";
import { ContainerModule, interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IInvoiceItemFactory>(DI_SYMBOLS.IInvoiceItemFactory).to(
        InvoiceItemFactory
    );
};

export const InvoiceItemFactoryModule = new ContainerModule(initializeModule);
