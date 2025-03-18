import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IBusinessAddressRepository } from "@/src/business/application/repositories/business-address.repository";
import { BusinessAddressRepository } from "@/src/business/infrastructure/persistence/repositories/business-address.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IBusinessAddressRepository>(DI_SYMBOLS.IBusinessAddressRepository).to(
        BusinessAddressRepository
    );
};

export const BusinessAddressRepositoryModule = new ContainerModule(
    initializeModule
);
