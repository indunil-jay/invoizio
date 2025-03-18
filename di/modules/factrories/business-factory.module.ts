import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import {
    BusinessFactory,
    IBusinessFactory,
} from "@/src/business/domain/factories/business.factory";

export const initializeModule = (bind: interfaces.Bind) => {
    bind<IBusinessFactory>(DI_SYMBOLS.IBusinessFactory).to(BusinessFactory);
};

export const BusinessFactoryModule = new ContainerModule(initializeModule);
