/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventHandler } from "@/src/shared-infrastructure/event-store/event-bus";

export interface IEventBus {
    subscribe<T>(
        eventType: { new (...args: any[]): T },
        handler: EventHandler<T>
    ): void;
    publish<T>(event: T): Promise<void>;
}
