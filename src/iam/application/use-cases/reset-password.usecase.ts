import { getInjection } from "@/di/container";

import {
    ExpiredPasswordResetTokenException,
    InvalidPasswordResetTokenException,
    PasswordResetProcessException,
    UserNotFoundException,
} from "@/src/iam/application/exceptions/specific.exceptions";
import { PasswordResetToken } from "@/src/iam/domain/password-reset-token.entity";
import { PasswordResetedEvent } from "@/src/iam/domain/events/password-reseted.event";
import { resetPasswordDto } from "@/src/iam/application/dto/reset-password.dto";

export const resetPasswordUseCase = {
    async execute({ password }: resetPasswordDto, token: string) {
        const passwordResetTokenRepository = getInjection(
            "IPasswordResetTokenRepository"
        );
        const userRepository = getInjection("IUserRepository");
        const hashingService = getInjection("IHashingService");
        const transactionManagerService = getInjection(
            "ITransactionManagerService"
        );
        const eventBus = getInjection("IEventBus");

        //check if token exists
        const existingToken =
            await passwordResetTokenRepository.getByToken(token);

        if (!existingToken) {
            throw new InvalidPasswordResetTokenException();
        }
        //check if user exists belongs to that token
        const existingUser = await userRepository.getByEmail(
            existingToken.email
        );

        if (!existingUser) {
            throw new UserNotFoundException(existingToken.email);
        }
        //check if token has expired
        if (this.hasExpired(existingToken)) {
            throw new ExpiredPasswordResetTokenException();
        }

        //create new password
        const hashedPassword = await hashingService.hash(password);

        //update password in db
        await transactionManagerService.startTransaction(async (tx) => {
            try {
                await userRepository.update(
                    existingUser.id,
                    {
                        password: hashedPassword,
                    },
                    tx
                );

                await passwordResetTokenRepository.remove(existingToken.id, tx);
            } catch {
                tx.rollback();
                throw new PasswordResetProcessException();
            }
        });

        //public a event password reset success full.
        eventBus.publish(new PasswordResetedEvent(existingUser));
    },

    hasExpired(passwordResetToken: PasswordResetToken) {
        return passwordResetToken.expires < new Date();
    },
};
