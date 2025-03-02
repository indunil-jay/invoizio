import { ContainerModule, interfaces } from "inversify";
import {
    IPasswordChangedEventHandler,
    PasswordChangedEventHandler,
} from "@/src/iam/application/handlers/password-changed.event-handler";
import { DI_SYMBOLS } from "@/di/types";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IPasswordChangedEventHandler>(
        DI_SYMBOLS.IPasswordChangedEventHandler
    ).to(PasswordChangedEventHandler);
};

export const PasswordChangedEventHandlerModule = new ContainerModule(
    initializeModule
);
