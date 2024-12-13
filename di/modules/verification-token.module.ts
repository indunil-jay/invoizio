import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IVerificationTokenRepository } from "@/src/application/repositories/verification-token-repository.interface";
import { VerificationTokenRepository } from "@/src/infastructure/repositories/verification-token.repository";

const initializeModule = (bind: interfaces.Bind) => {
  bind<IVerificationTokenRepository>(
    DI_SYMBOLS.IVerificationTokenRepository
  ).to(VerificationTokenRepository);
};

export const VerificationTokenModule = new ContainerModule(initializeModule);
