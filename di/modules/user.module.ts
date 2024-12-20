import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IUserRepository } from "@/src/application/repositories/user-repository.interface";
import { UserRepository } from "@/src/infastructure/repositories/user.repository";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IUserRepository>(DI_SYMBOLS.IUserRepository).to(UserRepository);
};

export const UserModule = new ContainerModule(initializeModule);
