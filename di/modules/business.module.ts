import { IBusinessRepository } from "@/src/application/repositories/business-repository.interface";
import { BusinessRepository } from "@/src/infastructure/repositories/business.repository";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IBusinessRepository>(DI_SYMBOLS.IBusinessRepository).to(
    BusinessRepository
  );
};

export const BusinessModule = new ContainerModule(initializeModule);
