import { getInjection } from "@/di/container";
import { signInDto } from "@/src/iam/application/dto/user.dto";
import {
    InvalidCredentialException,
    InvalidPasswordException,
} from "@/src/iam/application/exceptions/specific.exceptions";
import { ResendVerifyEmailEvent } from "@/src/iam/domain/events/resend-verify-email.event";
import { verificationLinkAlreadySent } from "@/src/iam/application/utils/response-messages/auth.specific";

export const signInUseCase = {
    async execute({ email, password }: signInDto) {
        // DI
        const hashingService = getInjection("IHashingService");
        const userRepository = getInjection("IUserRepository");
        const authenticationService = getInjection("IAuthenticationService");
        const eventBus = getInjection("IEventBus");

        // Check if user exists
        const existingUser = await userRepository.getByEmail(email);

        if (!existingUser || !existingUser.password) {
            throw new InvalidCredentialException();
        }

        // Verify password
        const isMatchingPassword = await hashingService.compare(
            password,
            existingUser.password
        );

        if (!isMatchingPassword) {
            throw new InvalidPasswordException();
        }

        // tigger re-send email again
        if (!existingUser.emailVerified) {
            await eventBus.publish(
                new ResendVerifyEmailEvent(existingUser.email)
            );

            return verificationLinkAlreadySent();
        }

        // Proceed with sign-in
        await authenticationService.signInWithCredentials({ email, password });
    },
};
