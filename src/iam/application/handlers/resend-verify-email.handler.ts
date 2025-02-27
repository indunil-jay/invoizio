import { injectable } from "inversify";
import { getInjection } from "@/di/container";
import { ResendVerifyEmailEvent } from "@/src/iam/domain/events/resend-verify-email.event";
import {
    EmailVerificationAlreadySentException,
    NotSignedUpException,
    VerificationEmailExpiredException,
} from "@/src/iam/application/exceptions/specific.exceptions";
import { VerificationToken } from "@/src/iam/domain/verification-token.entity";
import { getVerificationTokenExpiration } from "@/src/iam/application/utils/get-verifcation-token-expire";

export interface IResendVerifyEmailHandler {
    handle(event: ResendVerifyEmailEvent): Promise<void>;
}

@injectable()
export class ResendVerifyEmailHandler implements IResendVerifyEmailHandler {
    public async handle(event: ResendVerifyEmailEvent): Promise<void> {
        const emailService = getInjection("IEmailService");
        const tokenGenerateService = getInjection("ITokenGenerateService");
        const verificationTokenRepository = getInjection(
            "IVerificationTokenRepository"
        );
        const verificationTokenFactory = getInjection(
            "IVerificationTokenFactory"
        );
        const transactionManagerService = getInjection(
            "ITransactionManagerService"
        );
        const userRepository = getInjection("IUserRepository");

        //check if existing token
        const existingVerificationToken =
            await verificationTokenRepository.getByEmail(event.email);

        // if not
        if (!existingVerificationToken) {
            throw new NotSignedUpException();
        }

        // if exists and has not expired
        if (!this.hasExpired(existingVerificationToken)) {
            throw new EmailVerificationAlreadySentException();
        }

        //if exits and has expired

        if (this.hasExpired(existingVerificationToken)) {
            let token: string | undefined = undefined;

            await transactionManagerService.startTransaction(async (tx) => {
                try {
                    //delete old token
                    await verificationTokenRepository.remove(
                        existingVerificationToken.id,
                        tx
                    );
                    //create new token
                    token = tokenGenerateService.generate();
                    const expires = getVerificationTokenExpiration();
                    const verificationToken = verificationTokenFactory.create(
                        event.email,
                        token,
                        expires
                    );

                    //insert new token
                    await verificationTokenRepository.insert(
                        verificationToken,
                        tx
                    );
                } catch (error) {
                    tx.rollback();
                }
            });

            //send email again
            const user = await userRepository.getByEmail(event.email);
            await emailService.verifyAccount(user!, token!);

            // TODO: need to think about another way
            throw new VerificationEmailExpiredException();
        }
    }

    private hasExpired(verificationToken: VerificationToken) {
        return verificationToken.expires < new Date();
    }
}
