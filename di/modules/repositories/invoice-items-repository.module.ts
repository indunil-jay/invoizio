import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IInvoiceItemRepository } from "@/src/invoice/application/repositories/invoice-item.repository";
import { InvoiceItemRepository } from "@/src/invoice/infrastructure/persistence/repositories/invoice-item.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IInvoiceItemRepository>(DI_SYMBOLS.IInvoiceItemRepository).to(
        InvoiceItemRepository
    );
};

export const InvoiceItemsRepositoryModule = new ContainerModule(
    initializeModule
);
