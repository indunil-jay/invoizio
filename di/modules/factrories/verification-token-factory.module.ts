import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import {
    IVerificationTokenFactory,
    VerificationTokenFactory,
} from "@/src/iam/domain/factories/verification-token.factory";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IVerificationTokenFactory>(DI_SYMBOLS.IVerificationTokenFactory).to(
        VerificationTokenFactory
    );
};

export const VerificationTokenFactoryModule = new ContainerModule(
    initializeModule
);
