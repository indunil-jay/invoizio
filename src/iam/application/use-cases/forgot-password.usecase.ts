import { getInjection } from "@/di/container";
import { forgotPasswordDto } from "@/src/iam/application/dto/user.dto";
import { UserNotFoundException } from "@/src/iam/application/exceptions/specific.exceptions";
import { PasswordResetToken } from "@/src/iam/domain/password-reset-token.entity";
import { SendResetPasswordEmailEvent } from "@/src/iam/domain/events/send-reset-password-email.event";
import {
    passwordResetLinkAlreadySent,
    passwordResetLinkExpiredAndNewLinkASent,
    passwordResetLinkSent,
} from "@/src/iam/application/utils/response-messages/auth.specific";

export const forgotPasswordUseCase = {
    async execute({ email }: forgotPasswordDto): Promise<string> {
        const userRepository = getInjection("IUserRepository");
        const passwordResetTokenRepository = getInjection(
            "IPasswordResetTokenRepository"
        );
        const eventBus = getInjection("IEventBus");

        // Check if user exists
        const existingUser = await userRepository.getByEmail(email);
        if (!existingUser) {
            throw new UserNotFoundException(email);
        }

        // Check if reset token exists
        const existingPasswordResetToken =
            await passwordResetTokenRepository.getByEmail(email);

        if (!existingPasswordResetToken) {
            // Send email with new token
            await eventBus.publish(new SendResetPasswordEmailEvent(email));
            return passwordResetLinkSent();
        }

        // If token exists and has not expired
        if (!this.hasExpired(existingPasswordResetToken)) {
            return passwordResetLinkAlreadySent();
        }

        // If token exists and has expired
        await passwordResetTokenRepository.remove(
            existingPasswordResetToken.id
        );
        await eventBus.publish(new SendResetPasswordEmailEvent(email));

        return passwordResetLinkExpiredAndNewLinkASent();
    },

    hasExpired(passwordResetToken: PasswordResetToken): boolean {
        return passwordResetToken.expires < new Date();
    },
};
