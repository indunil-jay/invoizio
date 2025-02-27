import { injectable } from "inversify";
import { getInjection } from "@/di/container";
import { UserSignedUpEvent } from "@/src/iam/domain/events/user-signed-up.event";

export interface IUserSignedUpHandler {
    handle(event: UserSignedUpEvent): Promise<void>;
}

@injectable()
export class UserSignedUpHandler {
    async handle(event: UserSignedUpEvent) {
        const emailService = getInjection("IEmailService");
        await emailService.verifyAccount(event.user, event.verificationToken);
    }
}
