import { injectable } from "inversify";
import { PasswordChangedEvent } from "@/src/iam/domain/events/password-changed.event";
import { getInjection } from "@/di/container";

export interface IPasswordChangedEventHandler {
    handle(event: PasswordChangedEvent): Promise<void>;
}

@injectable()
export class PasswordChangedEventHandler
    implements IPasswordChangedEventHandler
{
    async handle(event: PasswordChangedEvent): Promise<void> {
        const emailService = getInjection("IEmailService");
        await emailService.sendPasswordChangedEmail(event.user);
    }
}
