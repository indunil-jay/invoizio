import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { HashingService } from "@/src/iam/infrastructure/services/hashing.service";
import { IHashingService } from "@/src/iam/application/services/hashing.service";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IHashingService>(DI_SYMBOLS.IHashingService).to(HashingService);
};

export const HashingModule = new ContainerModule(initializeModule);
