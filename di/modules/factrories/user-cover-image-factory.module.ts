import { DI_SYMBOLS } from "@/di/types";
import {
    IUserCoverImageFactory,
    UserCoverImageFactory,
} from "@/src/iam/domain/factories/user-cover-image.factory";
import { ContainerModule, interfaces } from "inversify";

export const initializeModule = (bind: interfaces.Bind) => {
    bind<IUserCoverImageFactory>(DI_SYMBOLS.IUserCoverImageFactory).to(
        UserCoverImageFactory
    );
};

export const UserCoverImageFactoryModule = new ContainerModule(
    initializeModule
);
