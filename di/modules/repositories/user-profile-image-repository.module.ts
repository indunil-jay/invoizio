import { DI_SYMBOLS } from "@/di/types";
import { IUserProfileImageRepository } from "@/src/iam/application/repositories/user-profile-image.repository";
import { UserProfileImageRepository } from "@/src/iam/infrastructure/persistence/repositories/user-profile-image.repository";
import { ContainerModule, interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IUserProfileImageRepository>(
        DI_SYMBOLS.IUserProfileImageRepository
    ).to(UserProfileImageRepository);
};

export const UserProfileImageRepositoryModule = new ContainerModule(
    initializeModule
);
