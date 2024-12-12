import { IHashingService } from "@/src/application/services/hashing-service.interface";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { HashingService } from "@/src/infastructure/services/hashing.service";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IHashingService>(DI_SYMBOLS.IHashingService).to(HashingService);
};

export const HashingModule = new ContainerModule(initializeModule);
