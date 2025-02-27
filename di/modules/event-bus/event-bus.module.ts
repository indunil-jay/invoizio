import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";

import { IEventBus } from "@/src/shared-infrastructure/event-store/event-bus.interface";
import { EventBus } from "@/src/shared-infrastructure/event-store/event-bus";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IEventBus>(DI_SYMBOLS.IEventBus).to(EventBus);
};

export const eventBusModule = new ContainerModule(initializeModule);
