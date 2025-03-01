import { getInjection } from "@/di/container";
import { PASSWORD_RESET_TOKEN_EXPIRATION_MS } from "@/src/constants";
import { AuthenticationError } from "@/src/infastructure/errors/errors";

export const forgotPasswordUseCase = {
    async execute(email: string) {
        //di
        const userRepository = getInjection("IUserRepository");
        const emailService = getInjection("IEmailService");
        const tokenGeneratorService = getInjection("ITokenGeneratorService");
        const passwordResetTokenRepository = getInjection(
            "IPasswordResetTokenRepository"
        );

        // Check if the email exists
        const existingUserDocument = await userRepository.getByEmail(email);

        if (!existingUserDocument) {
            throw new AuthenticationError(
                "No user found with the provided email address. Please check the email and try again."
            );
        }

        const token = tokenGeneratorService.generate();
        const currentDate = new Date();
        const expires = new Date(currentDate.getTime() + b);

        //check if there existing reset  document
        const existingPasswordResetTokenDocument =
            await passwordResetTokenRepository.getByEmail(
                existingUserDocument.email
            );

        // Check if token exists and has not expired
        if (
            existingPasswordResetTokenDocument &&
            existingPasswordResetTokenDocument.expires > currentDate
        ) {
            return {
                success: true,
                message:
                    "A password reset link already has been sent to your inbox. Please check your email.",
            };
        }

        // Check if token exists and has expired
        if (
            existingPasswordResetTokenDocument &&
            existingPasswordResetTokenDocument.expires < currentDate
        ) {
            //TODO:database transactins
            await passwordResetTokenRepository.deleteById(
                existingPasswordResetTokenDocument.id
            );

            const newPasswordResetTokenDocument =
                await passwordResetTokenRepository.create({
                    token,
                    email,
                    expires,
                });
            await emailService.sendPasswordResetEmail(
                newPasswordResetTokenDocument.email,
                newPasswordResetTokenDocument.token
            );

            return {
                success: true,
                message:
                    "Your previous password reset link expired. A new email has been sent to your inbox.",
            };
        }

        // Create new verification token document
        const newPasswordResetTokenDocument =
            await passwordResetTokenRepository.create({
                token: token,
                email,
                expires,
            });

        await emailService.sendPasswordResetEmail(
            newPasswordResetTokenDocument.email,
            newPasswordResetTokenDocument.token
        );

        return {
            success: true,
            message:
                "A password reset link has been sent to your  inbox. Please check your email.",
        };
    },
};
