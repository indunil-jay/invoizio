import { injectable } from "inversify";
import { EmailUpdatedEvent } from "@/src/iam/domain/events/email-updated.event";
import { getInjection } from "@/di/container";
import { getVerificationTokenExpiration } from "../utils/get-verifcation-token-expire";

export interface IEmailUpdatedEventHandler {
    handle(event: EmailUpdatedEvent): Promise<void>;
}

@injectable()
export class EmailUpdatedEventHandler implements IEmailUpdatedEventHandler {
    async handle(event: EmailUpdatedEvent): Promise<void> {
        const emailService = getInjection("IEmailService");
        const tokenGenerateService = getInjection("ITokenGenerateService");
        const verificationTokenRepository = getInjection(
            "IVerificationTokenRepository"
        );
        const verificationTokenFactory = getInjection(
            "IVerificationTokenFactory"
        );

        //generate new  token
        const token = tokenGenerateService.generate();
        const expires = getVerificationTokenExpiration();
        // create  verificationToken
        const verificationToken = verificationTokenFactory.create(
            event.user.email,
            token,
            expires
        );

        //save it database
        await verificationTokenRepository.insert(verificationToken);

        //send  email
        await emailService.sendVerifyEmail(event.user, token);
    }
}
