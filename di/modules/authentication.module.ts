import { IAuthenticationService } from "@/src/application/services/authentication-service.interface";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { AuthenticationService } from "@/src/infastructure/services/authentication.service";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(
    AuthenticationService
  );
};

export const AuthenticationModule = new ContainerModule(initializeModule);
