import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IAccountRepository } from "@/src/iam/application/repositories/provider-account.repository";
import { AccountRepository } from "@/src/iam/infrastructure/persistence/repositories/provider-account.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IAccountRepository>(DI_SYMBOLS.IAccountRepository).to(
        AccountRepository
    );
};

export const AccountRepositoryModule = new ContainerModule(initializeModule);
