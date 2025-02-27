import { ClientAddressRepository } from "@/src/infastructure/repositories/client-address.repository";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "../../types";
import { IClientAddressRepository } from "@/src/application/repositories/client-address-repository.interface";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IClientAddressRepository>(DI_SYMBOLS.IClientAddressRepository).to(
        ClientAddressRepository
    );
};

export const ClientAddressRepositoryModule = new ContainerModule(initializeModule);
