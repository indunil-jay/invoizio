import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IInvoiceRepository } from "@/src/invoice/application/repositories/invoice.repository";
import { InvoiceRepository } from "@/src/invoice/infrastructure/persistence/repositories/invoice.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IInvoiceRepository>(DI_SYMBOLS.IInvoiceRepository).to(
        InvoiceRepository
    );
};

export const InvoiceRepositoryModule = new ContainerModule(initializeModule);
