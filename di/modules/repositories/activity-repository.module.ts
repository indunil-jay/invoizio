import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { IActivityRepository } from "@/src/application/repositories/activities-repository.interface";
import { ActivityRepository } from "@/src/infastructure/repositories/activity.repository";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IActivityRepository>(DI_SYMBOLS.IActivityRepository).to(
        ActivityRepository
    );
};

export const ActivityRepositoryModule = new ContainerModule(initializeModule);
