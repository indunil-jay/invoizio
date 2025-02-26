import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IUserRepository } from "@/src/iam/application/repositories/user.repository";
import { UserRepository } from "@/src/iam/infrastructure/persistence/repositories/user.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IUserRepository>(DI_SYMBOLS.IUserRepository).to(UserRepository);
};

export const UserModule = new ContainerModule(initializeModule);
