import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { ITransactionManagerService } from "@/src/shared/database-transaction/transaction-manager.service.interface";
import { TransactionManagerService } from "@/src/shared/database-transaction/transaction-manager.service";

const initializeModule = (bind: interfaces.Bind) => {
    bind<ITransactionManagerService>(DI_SYMBOLS.ITransactionManagerService).to(
        TransactionManagerService
    );
};

export const TransactionManagerServiceModule = new ContainerModule(
    initializeModule
);
