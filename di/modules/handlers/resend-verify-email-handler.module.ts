import { DI_SYMBOLS } from "@/di/types";
import {
    IResendVerifyEmailHandler,
    ResendVerifyEmailHandler,
} from "@/src/iam/application/handlers/resend-verify-email.handler";
import { ContainerModule, interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IResendVerifyEmailHandler>(DI_SYMBOLS.IResendVerifyEmailHandler).to(
        ResendVerifyEmailHandler
    );
};

export const ResendVerifyEmailHandlerModule = new ContainerModule(
    initializeModule
);
