import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IAuthenticationService } from "@/src/iam/application/services/authentication.service";
import { AuthenticationService } from "@/src/iam/infrastructure/services/authentication.service";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(
        AuthenticationService
    );
};

export const AuthenticationServiceModule = new ContainerModule(
    initializeModule
);
