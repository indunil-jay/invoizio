import { injectable } from "inversify";
import { getInjection } from "@/di/container";
import { ResendVerifyEmailEvent } from "@/src/iam/domain/events/resend-verify-email.event";
import {
    EmailVerificationAlreadySentException,
    NotSignedUpException,
} from "@/src/iam/application/exceptions/specific.exceptions";
import { VerificationToken } from "@/src/iam/domain/verification-token.entity";
import { getVerificationTokenExpiration } from "@/src/iam/application/utils/get-verifcation-token-expire";
import { User } from "@/src/iam/domain/user.entity";

export interface IResendVerifyEmailEventHandler {
    handle(event: ResendVerifyEmailEvent): Promise<void>;
}

@injectable()
export class ResendVerifyEmailEventHandler
    implements IResendVerifyEmailEventHandler
{
    public async handle(event: ResendVerifyEmailEvent): Promise<void> {
        const verificationTokenRepository = getInjection(
            "IVerificationTokenRepository"
        );

        //check if existing token
        const existingVerificationToken =
            await verificationTokenRepository.getByEmail(event.user.email);

        // if not
        if (!existingVerificationToken) {
            throw new NotSignedUpException();
        }

        // if exists and has not expired
        if (!this.hasExpired(existingVerificationToken)) {
            throw new EmailVerificationAlreadySentException();
        }

        //if exits and has expired

        await this.generateAndSendNewToken(
            existingVerificationToken,
            event.user
        );
    }

    private async generateAndSendNewToken(
        existingVerificationToken: VerificationToken,
        user: User
    ) {
        const transactionManagerService = getInjection(
            "ITransactionManagerService"
        );
        const tokenGenerateService = getInjection("ITokenGenerateService");
        const verificationTokenFactory = getInjection(
            "IVerificationTokenFactory"
        );
        const verificationTokenRepository = getInjection(
            "IVerificationTokenRepository"
        );
        const emailService = getInjection("IEmailService");

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
                    existingVerificationToken.email,
                    token,
                    expires
                );

                //insert new token
                await verificationTokenRepository.insert(verificationToken, tx);
            } catch {
                tx.rollback();
            }
        });

        //send email again
        await emailService.verifyAccount(user, token!);
    }

    private hasExpired(verificationToken: VerificationToken) {
        return verificationToken.expires < new Date();
    }
}
