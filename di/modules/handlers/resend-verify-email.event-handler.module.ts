import { DI_SYMBOLS } from "@/di/types";
import {
    IResendVerifyEmailEventHandler,
    ResendVerifyEmailEventHandler,
} from "@/src/iam/application/handlers/resend-verify-email.event-handler";
import { ContainerModule, interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IResendVerifyEmailEventHandler>(
        DI_SYMBOLS.IResendVerifyEmailEventHandler
    ).to(ResendVerifyEmailEventHandler);
};

export const ResendVerifyEmailEventHandlerModule = new ContainerModule(
    initializeModule
);
