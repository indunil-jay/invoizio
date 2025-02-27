import { getInjection } from "@/di/container";
import {
    EmailVerificationProcessException,
    InvalidVerificationTokenException,
    UserNotFoundException,
    VerificationTokenExpiresException,
} from "@/src/iam/application/exceptions/specific.exceptions";

export const emailVerifyUseCase = {
    async execute(token: string) {
        const verificationTokenRepository = getInjection(
            "IVerificationTokenRepository"
        );
        const userRepository = getInjection("IUserRepository");

        const transactionManagerService = getInjection(
            "ITransactionManagerService"
        );

        // Check if the token exists
        const existingVerificationToken =
            await verificationTokenRepository.getByToken(token);

        // if there  is no token
        if (!existingVerificationToken) {
            throw new InvalidVerificationTokenException();
        }

        // check existing token has expired
        if (existingVerificationToken.expires < new Date()) {
            throw new VerificationTokenExpiresException();
        }

        // Validate the user associated with the token
        const associateUser = await userRepository.getByEmail(
            existingVerificationToken.email
        );
        if (!associateUser) {
            throw new UserNotFoundException(existingVerificationToken.email);
        }

        // Update the user document to mark email as verified and remove the token

        transactionManagerService.startTransaction(async (tx) => {
            try {
                await userRepository.update(associateUser.id, {
                    emailVerified: new Date(),
                });
                await verificationTokenRepository.remove(associateUser.id);
            } catch {
                tx.rollback();
                throw new EmailVerificationProcessException();
            }
        });
    },
};
