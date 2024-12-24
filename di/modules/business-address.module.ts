import { IBusinessAddressRepository } from "@/src/application/repositories/business-address-repository.interface";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { BusinessAddressRepository } from "@/src/infastructure/repositories/business-address.repository";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IBusinessAddressRepository>(DI_SYMBOLS.IBusinessAddressRepository).to(
    BusinessAddressRepository
  );
};

export const BusinessAddressModule = new ContainerModule(initializeModule);
