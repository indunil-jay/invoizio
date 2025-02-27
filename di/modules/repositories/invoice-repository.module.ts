import { IInvoiceRepository } from "@/src/application/repositories/invoice-repository.interface";
import { InvoiceRepository } from "@/src/infastructure/repositories/invoice.repository";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IInvoiceRepository>(DI_SYMBOLS.IInvoiceRepository).to(InvoiceRepository);
};

export const InvoiceRepositoryModule = new ContainerModule(initializeModule);
