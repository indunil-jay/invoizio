import { DI_SYMBOLS } from "@/di/types";
import {
    IUserFactory,
    UserFactory,
} from "@/src/iam/domain/factories/user.factory";
import { ContainerModule, interfaces } from "inversify";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IUserFactory>(DI_SYMBOLS.IUserFactory).to(UserFactory);
};

export const UserFactoryModule = new ContainerModule(initializeModule);
