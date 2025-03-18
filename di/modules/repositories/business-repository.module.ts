import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IBusinessRepository } from "@/src/business/application/repositories/business.repository";
import { BusinessRepository } from "@/src/business/infrastructure/persistence/repositories/business.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IBusinessRepository>(DI_SYMBOLS.IBusinessRepository).to(
        BusinessRepository
    );
};
export const BusinessRepositoryModule = new ContainerModule(initializeModule);
