import { ContainerModule, interfaces } from "inversify";
import { DI_SYMBOLS } from "@/di/types";
import { EventBus } from "@/src/shared/event-bus";
import { IEventBus } from "@/src/shared-infrastructure/event-store/event-bus.interface";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IEventBus>(DI_SYMBOLS.IEventBus).to(EventBus);
};

export const eventBusModule = new ContainerModule(initializeModule);
