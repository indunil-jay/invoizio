import { injectable } from "inversify";
import { SendResetPasswordEmailEvent } from "@/src/iam/domain/events/send-reset-password-email.event";
import { getInjection } from "@/di/container";
import { getResetTokenExpiration } from "@/src/iam/application/utils/get-password-reset-token-expire";

export interface ISendResetPasswordEmailEventHandler {
    handle(event: SendResetPasswordEmailEvent): Promise<void>;
}

@injectable()
export class SendResetPasswordEmailEventHandler
    implements ISendResetPasswordEmailEventHandler
{
    public async handle(event: SendResetPasswordEmailEvent): Promise<void> {
        //create new token and send email
        const tokenGenerateService = getInjection("ITokenGenerateService");
        const emailService = getInjection("IEmailService");
        const passwordResetTokenRepository = getInjection(
            "IPasswordResetTokenRepository"
        );
        const passwordResetTokenFactory = getInjection(
            "IPasswordResetTokenFactory"
        );

        //create token
        const token = tokenGenerateService.generate();
        const expires = getResetTokenExpiration();
        const passwordResetToken = passwordResetTokenFactory.create(
            event.user.email,
            token,
            expires
        );

        //save in database
        await passwordResetTokenRepository.insert(passwordResetToken);

        //send email
        await emailService.sendResetPasswordEmail(event.user, token);
    }
}
