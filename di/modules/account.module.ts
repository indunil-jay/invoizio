import { AccountRepository } from "@/src/infastructure/repositories/account.repository";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IAccountRepository } from "@/src/application/repositories/account-repository.interface";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IAccountRepository>(DI_SYMBOLS.IAccountRepository).to(AccountRepository);
};

export const AccountModule = new ContainerModule(initializeModule);
