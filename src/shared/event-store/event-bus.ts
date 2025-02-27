/* eslint-disable @typescript-eslint/no-explicit-any */
import { injectable } from "inversify";
import { IEventBus } from "@/src/shared/event-store/event-bus.interface";

export type EventHandler<T> = (event: T) => Promise<void>;

@injectable()
export class EventBus implements IEventBus {
    private handlers: Map<string, EventHandler<any>[]> = new Map();

    // Subscribe method to add handlers for events
    subscribe<T>(
        eventType: { new (...args: any[]): T },
        handler: EventHandler<T>
    ): void {
        const eventTypeName = eventType.name;
        if (!this.handlers.has(eventTypeName)) {
            this.handlers.set(eventTypeName, []);
        }
        this.handlers.get(eventTypeName)!.push(handler);
    }

    // Publish method to trigger all handlers for an event
    async publish<T>(event: T): Promise<void> {
        const eventTypeName = (event as any).constructor.name;
        const handlers = this.handlers.get(eventTypeName) || [];
        for (const handler of handlers) {
            await handler(event);
        }
    }
}
