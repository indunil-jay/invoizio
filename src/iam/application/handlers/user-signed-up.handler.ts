import { injectable } from "inversify";
import { getInjection } from "@/di/container";
import { UserSignedUpEvent } from "@/src/iam/domain/events/user-signed-up.event";

export interface IUserSignedUpHandler {
    handle(event: UserSignedUpEvent): Promise<void>;
}

export const VERIFICATION_TOKEN_EXPIRATION_MS = 10 * 60 * 1000;
@injectable()
export class UserSignedUpHandler {
    async handle(event: UserSignedUpEvent) {
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
        const expires = new Date(
            new Date().getTime() + VERIFICATION_TOKEN_EXPIRATION_MS
        );
        // create  verificationToken
        const verificationToken = verificationTokenFactory.create(
            event.user.email,
            token,
            expires
        );

        //save it database
        await verificationTokenRepository.insert(verificationToken);

        //send  email
        await emailService.verifyAccount(event.user, token);
    }
}
