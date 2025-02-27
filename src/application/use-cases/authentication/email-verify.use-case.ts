import { getInjection } from "@/di/container";
import { NotFoundError } from "@/src/domain/errors/errors";
import { UnauthenticatedError } from "@/src/infastructure/errors/errors";
import { ClientResponseDTO } from "@/src/application/dtos/response.dto";

export const emailVerifyUseCase = {
    async execute(token: string): Promise<ClientResponseDTO> {
        // DI
        const verificationTokenRepository = getInjection(
            "IVerificationTokenRepository"
        );
        const userRepository = getInjection("IUserRepository");

        // Check if the token exists
        const existingVerificationTokenDocument =
            await verificationTokenRepository.getByToken(token);

        if (!existingVerificationTokenDocument) {
            throw new UnauthenticatedError(
                "The provided token is invalid or does not exist. Please ensure the token is correct and try again."
            );
        }

        // Check if the token has expired
        if (existingVerificationTokenDocument.expires < new Date()) {
            throw new UnauthenticatedError(
                "The verification token has expired. Please request a new verification link to proceed."
            );
        }

        // Validate the user associated with the token
        const existingUserDocument = await userRepository.getByEmail(
            existingVerificationTokenDocument.email
        );
        if (!existingUserDocument) {
            throw new NotFoundError(
                `No user found associated with the email address: ${existingVerificationTokenDocument.email}. Please ensure the email is correct.`
            );
        }

        // Update the user document to mark email as verified
        // TODO: Implement database transaction handling for consistency
        await userRepository.update(existingUserDocument.id, {
            emailVerified: new Date(),
        });

        // Remove the verification token
        await verificationTokenRepository.deleteById(
            existingVerificationTokenDocument.id
        );

        return {
            success: true,
            message:
                "Email verified successfully. Please log in to access your account.",
        };
    },
};
