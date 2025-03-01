import { getInjection } from "@/di/container";
import { ResendVerifyEmailEvent } from "@/src/iam/domain/events/resend-verify-email.event";
import { SendResetPasswordEmailEvent } from "@/src/iam/domain/events/send-reset-password-email.event";
import { UserSignedUpEvent } from "@/src/iam/domain/events/user-signed-up.event";

const eventBus = getInjection("IEventBus");

eventBus.subscribe(UserSignedUpEvent, async (event: UserSignedUpEvent) => {
    const handler = getInjection("IUserSignedUpEventHandler");
    await handler.handle(event);
});

eventBus.subscribe(
    ResendVerifyEmailEvent,
    async (event: ResendVerifyEmailEvent) => {
        const handler = getInjection("IResendVerifyEmailEventHandler");
        await handler.handle(event);
    }
);

eventBus.subscribe(
    SendResetPasswordEmailEvent,
    async (event: SendResetPasswordEmailEvent) => {
        const handler = getInjection("ISendResetPasswordEmailEventHandler");
        await handler.handle(event);
    }
);
