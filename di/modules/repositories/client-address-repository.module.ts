import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IClientAddressRepository } from "@/src/client-user/application/repositories/client-address-repository";
import { ClientAddressRepository } from "@/src/client-user/infrastructure/persistance/repositories/client-address.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IClientAddressRepository>(DI_SYMBOLS.IClientAddressRepository).to(
        ClientAddressRepository
    );
};

export const ClientAddressRepositoryModule = new ContainerModule(
    initializeModule
);
