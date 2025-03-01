import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import {
    IUserSignedUpEventHandler,
    UserSignedUpEventHandler,
} from "@/src/iam/application/handlers/user-signed-up.event-handler";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IUserSignedUpEventHandler>(DI_SYMBOLS.IUserSignedUpEventHandler).to(
        UserSignedUpEventHandler
    );
};

export const UserSignedUpEventHandlerModule = new ContainerModule(
    initializeModule
);
