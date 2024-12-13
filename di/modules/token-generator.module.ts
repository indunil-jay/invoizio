import { ITokenGeneratorService } from "@/src/application/services/token-generator-service.interface";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { TokenGeneratorService } from "@/src/infastructure/services/token-generator.service";

const initializeModule = (bind: interfaces.Bind) => {
  bind<ITokenGeneratorService>(DI_SYMBOLS.ITokenGeneratorService).to(
    TokenGeneratorService
  );
};

export const TokenGeneratorModule = new ContainerModule(initializeModule);
