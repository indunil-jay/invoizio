import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import {
    BusinessAddressFactory,
    IBusinessAddressFactory,
} from "@/src/business/domain/factories/business-address-factory";

export const initializeModule = (bind: interfaces.Bind) => {
    bind<IBusinessAddressFactory>(DI_SYMBOLS.IBusinessAddressFactory).to(
        BusinessAddressFactory
    );
};

export const BusinessAddressFactoryModule = new ContainerModule(
    initializeModule
);
