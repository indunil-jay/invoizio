console.log("🔹 Event subscribers file loaded");

import { getInjection } from "@/di/container";
import { UserSignedUpEvent } from "../iam/domain/events/user-signed-up.event";

const eventBus = getInjection("IEventBus");

eventBus.subscribe(UserSignedUpEvent, async (event: UserSignedUpEvent) => {
    console.log(
        "🔹 UserSignedUpEvent received by event-bus.subscriber.ts",
        event
    );
    const handler = getInjection("IUserSignedUpHandler");
    console.log("🔹 UserSignedUpHandler found:", handler);
    await handler.handle(event);
});
