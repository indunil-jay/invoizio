import { DI_SYMBOLS } from "@/di/types";
import {
    BusinessProfileImageFactory,
    IBusinessProfileImageFactory,
} from "@/src/business/domain/factories/business-profile-image.factory";

import { ContainerModule, interfaces } from "inversify";

export const initializeModule = (bind: interfaces.Bind) => {
    bind<IBusinessProfileImageFactory>(
        DI_SYMBOLS.IBusinessProfileImageFactory
    ).to(BusinessProfileImageFactory);
};

export const BusinessProfileImageFactoryModule = new ContainerModule(
    initializeModule
);
