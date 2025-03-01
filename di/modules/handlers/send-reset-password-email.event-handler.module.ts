import { DI_SYMBOLS } from "@/di/types";
import {
    ISendResetPasswordEmailEventHandler,
    SendResetPasswordEmailEventHandler,
} from "@/src/iam/application/handlers/send-reset-password-email.event.handler";
import { ContainerModule, interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind) => {
    bind<ISendResetPasswordEmailEventHandler>(
        DI_SYMBOLS.ISendResetPasswordEmailEventHandler
    ).to(SendResetPasswordEmailEventHandler);
};

export const SendResetPasswordEmailEventHandlerModule = new ContainerModule(
    initializeModule
);
