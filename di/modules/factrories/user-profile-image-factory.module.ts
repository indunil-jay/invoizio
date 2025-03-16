import { DI_SYMBOLS } from "@/di/types";
import {
    IUserProfileImageFactory,
    UserProfileImageFactory,
} from "@/src/iam/domain/factories/user-profile-image.factory";
import { ContainerModule, interfaces } from "inversify";

export const initializeModule = (bind: interfaces.Bind) => {
    bind<IUserProfileImageFactory>(DI_SYMBOLS.IUserProfileImageFactory).to(
        UserProfileImageFactory
    );
};

export const UserProfileImageFactoryModule = new ContainerModule(
    initializeModule
);
