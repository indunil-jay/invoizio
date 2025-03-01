import { getInjection } from "@/di/container";
import {
    InvalidCredentialException,
    InvalidPasswordException,
} from "@/src/iam/application/exceptions/specific.exceptions";
import { ResendVerifyEmailEvent } from "@/src/iam/domain/events/resend-verify-email.event";
import {
    newVerificationLinkSent,
    signInSuccess,
} from "@/src/iam/application/utils/response-messages/auth.specific";
import { signInDto } from "@/src/iam/application/dto/sign-in.dto";

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
            await eventBus.publish(new ResendVerifyEmailEvent(existingUser));

            return newVerificationLinkSent();
        }

        // Proceed with sign-in
        await authenticationService.signInWithCredentials({ email, password });
        return signInSuccess();
    },
};
