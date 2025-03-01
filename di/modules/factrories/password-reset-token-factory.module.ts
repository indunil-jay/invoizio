import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import {
    IPasswordResetTokenFactory,
    PasswordResetTokenFactory,
} from "@/src/iam/domain/factories/password-reset-token.factory";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IPasswordResetTokenFactory>(DI_SYMBOLS.IPasswordResetTokenFactory).to(
        PasswordResetTokenFactory
    );
};

export const PasswordResetTokenFactoryModule = new ContainerModule(
    initializeModule
);
