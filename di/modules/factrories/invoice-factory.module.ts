import { DI_SYMBOLS } from "@/di/types";
import {
    IInvoiceFactory,
    InvoiceFactory,
} from "@/src/invoice/domain/factories/invoice-factory";
import { ContainerModule, interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IInvoiceFactory>(DI_SYMBOLS.IInvoiceFactory).to(InvoiceFactory);
};

export const InvoiceFactoryModule = new ContainerModule(initializeModule);
