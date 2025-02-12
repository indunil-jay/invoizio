import { ITransactionManagerService } from "@/src/application/services/transaction-service.interface";
import { TransactionManagerService } from "@/src/infastructure/services/transaction-manager.service";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";

const initializeModule = (bind: interfaces.Bind) => {
  bind<ITransactionManagerService>(DI_SYMBOLS.ITransactionManagerService).to(
    TransactionManagerService
  );
};

export const TransactionManagerModule = new ContainerModule(initializeModule);
