import { IInvoiceItemsRepository } from "@/src/application/repositories/invoice-item-repository.interface";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { InvoiceItemsRepository } from "@/src/infastructure/repositories/invoice-item.repository";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IInvoiceItemsRepository>(DI_SYMBOLS.IInvoiceItemsRepository).to(
    InvoiceItemsRepository
  );
};

export const InvoiceItemsModule = new ContainerModule(initializeModule);
