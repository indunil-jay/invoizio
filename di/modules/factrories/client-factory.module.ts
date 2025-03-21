import { DI_SYMBOLS } from "@/di/types";
import {
    ClientFactory,
    IClientFactory,
} from "@/src/client-user/domain/factories/client-factory";
import { ContainerModule, interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IClientFactory>(DI_SYMBOLS.IClientFactory).to(ClientFactory);
};

export const ClientFactoryModule = new ContainerModule(initializeModule);
