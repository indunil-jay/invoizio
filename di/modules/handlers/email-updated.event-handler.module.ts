import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import {
    EmailUpdatedEventHandler,
    IEmailUpdatedEventHandler,
} from "@/src/iam/application/handlers/email-updated.event-handler";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IEmailUpdatedEventHandler>(DI_SYMBOLS.IEmailUpdatedEventHandler).to(
        EmailUpdatedEventHandler
    );
};

export const EmailUpdatedEventHandlerModule = new ContainerModule(
    initializeModule
);
