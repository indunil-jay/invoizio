import { injectable } from "inversify";
import { PasswordResetedEvent } from "../../domain/events/password-reseted.event";
import { getInjection } from "@/di/container";

export interface IPasswordResetedEventHandler {
    handle(event: PasswordResetedEvent): Promise<void>;
}

@injectable()
export class PasswordResetedEventHandler
    implements IPasswordResetedEventHandler
{
    public async handle(event: PasswordResetedEvent): Promise<void> {
        const emailService = getInjection("IEmailService");

        await emailService.sendPasswordResetedEmail(event.user);
    }
}
