import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IVerificationTokenRepository } from "@/src/iam/application/repositories/verification-token.repository";
import { VerificationTokenRepository } from "@/src/iam/infrastructure/persistence/repositories/veification-token.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IVerificationTokenRepository>(
        DI_SYMBOLS.IVerificationTokenRepository
    ).to(VerificationTokenRepository);
};

export const VerificationTokenRepositoryModule = new ContainerModule(initializeModule);
