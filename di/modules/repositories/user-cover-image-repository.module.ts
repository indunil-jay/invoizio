import { DI_SYMBOLS } from "@/di/types";
import { IUserCoverImageRepository } from "@/src/iam/application/repositories/user-cover-image.repository";
import { UserCoverImageRepository } from "@/src/iam/infrastructure/persistence/repositories/user-cover-image.repository";
import { ContainerModule, interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IUserCoverImageRepository>(DI_SYMBOLS.IUserCoverImageRepository).to(
        UserCoverImageRepository
    );
};

export const UserCoverImageRepositoryModule = new ContainerModule(
    initializeModule
);
