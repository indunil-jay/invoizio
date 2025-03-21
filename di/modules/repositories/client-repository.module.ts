import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IClientRepository } from "@/src/client-user/application/repositories/client-repository";
import { ClientRepository } from "@/src/client-user/infrastructure/persistance/repositories/client.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IClientRepository>(DI_SYMBOLS.IClientRepository).to(ClientRepository);
};

export const ClientRepositoryModule = new ContainerModule(initializeModule);
