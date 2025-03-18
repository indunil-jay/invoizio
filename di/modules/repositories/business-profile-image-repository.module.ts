import { DI_SYMBOLS } from "@/di/types";
import { IBusinessProfileImageRepository } from "@/src/business/application/repositories/business-profile-image.repository";
import { BusinessProfileImageRepository } from "@/src/business/infrastructure/persistence/repositories/business-profile-images.repository";
import { ContainerModule, interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IBusinessProfileImageRepository>(
        DI_SYMBOLS.IBusinessProfileImageRepository
    ).to(BusinessProfileImageRepository);
};

export const BusinessProfileImageRepositoryModule = new ContainerModule(
    initializeModule
);
