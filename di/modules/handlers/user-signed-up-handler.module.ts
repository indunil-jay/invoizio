import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import {
    IUserSignedUpHandler,
    UserSignedUpHandler,
} from "@/src/iam/application/handlers/user-signed-up.handler";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IUserSignedUpHandler>(DI_SYMBOLS.IUserSignedUpHandler).to(
        UserSignedUpHandler
    );
};

export const UserSignedUpHandlerModule = new ContainerModule(initializeModule);
