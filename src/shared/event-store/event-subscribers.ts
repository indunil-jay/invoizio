import { getInjection } from "@/di/container";
import { ResendVerifyEmailEvent } from "@/src/iam/domain/events/resend-verify-email.event";
import { UserSignedUpEvent } from "@/src/iam/domain/events/user-signed-up.event";

const eventBus = getInjection("IEventBus");

eventBus.subscribe(UserSignedUpEvent, async (event: UserSignedUpEvent) => {
    const handler = getInjection("IUserSignedUpHandler");
    await handler.handle(event);
});

eventBus.subscribe(
    ResendVerifyEmailEvent,
    async (event: ResendVerifyEmailEvent) => {
        const handler = getInjection("IResendVerifyEmailHandler");
        await handler.handle(event);
    }
);
