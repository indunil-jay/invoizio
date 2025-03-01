import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import {
    IPasswordResetedEventHandler,
    PasswordResetedEventHandler,
} from "@/src/iam/application/handlers/password-reseted-event-handler";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IPasswordResetedEventHandler>(
        DI_SYMBOLS.IPasswordResetedEventHandler
    ).to(PasswordResetedEventHandler);
};

export const PasswordResetedEventHandlerModule = new ContainerModule(
    initializeModule
);
