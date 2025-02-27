import { injectable } from "inversify";
import { getInjection } from "@/di/container";
import { UserSignedUpEvent } from "@/src/iam/domain/events/user-signed-up.event";
import { getVerificationTokenExpiration } from "../utils/get-verifcation-token-expire";

export interface IUserSignedUpHandler {
    handle(event: UserSignedUpEvent): Promise<void>;
}

export const VERIFICATION_TOKEN_EXPIRATION_MS = 10 * 60 * 1000;

@injectable()
export class UserSignedUpHandler implements IUserSignedUpHandler {
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
        await emailService.verifyAccount(event.user, token);
    }
}
