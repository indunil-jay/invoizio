import { PasswordResetTokenRepository } from "@/src/infastructure/repositories/password-reset-token.repository";
import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IPasswordResetTokenRepository } from "@/src/application/repositories/password-reset-token-repository.interface";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IPasswordResetTokenRepository>(
    DI_SYMBOLS.IPasswordResetTokenRepository
  ).to(PasswordResetTokenRepository);
};

export const PasswordResetTokenModule = new ContainerModule(initializeModule);
