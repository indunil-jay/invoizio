import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { TokenGenerateService } from "@/src/iam/infrastructure/services/token-generate.service";
import { ITokenGenerateService } from "@/src/iam/application/services/token-generate.service";

const initializeModule = (bind: interfaces.Bind) => {
    bind<ITokenGenerateService>(DI_SYMBOLS.ITokenGenerateService).to(
        TokenGenerateService
    );
};

export const TokenGeneratorModule = new ContainerModule(initializeModule);
