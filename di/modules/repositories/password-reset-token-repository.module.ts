import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IPasswordResetTokenRepository } from "@/src/iam/application/repositories/password-reset-token.repository";
import { PasswordResetTokenRepository } from "@/src/iam/infrastructure/persistence/repositories/password-reset-token.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IPasswordResetTokenRepository>(
        DI_SYMBOLS.IPasswordResetTokenRepository
    ).to(PasswordResetTokenRepository);
};

export const PasswordResetTokenRepositoryModule = new ContainerModule(
    initializeModule
);
