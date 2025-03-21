import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import {
    ClientAddressFactory,
    IClientAddressFactory,
} from "@/src/client-user/domain/factories/client-address-factory";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IClientAddressFactory>(DI_SYMBOLS.IClientAddressFactory).to(
        ClientAddressFactory
    );
};

export const ClientAddressFactoryModule = new ContainerModule(initializeModule);
