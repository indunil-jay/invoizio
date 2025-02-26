import { EventHandler } from "./event-bus";

export interface IEventBus {
    subscribe<T>(
        eventType: { new (...args: any[]): T },
        handler: EventHandler<T>
    ): void;
    publish<T>(event: T): Promise<void>;
}
