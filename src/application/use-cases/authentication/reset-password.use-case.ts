import { getInjection } from "@/di/container";
import {
  AuthenticationError,
  UnauthenticatedError,
} from "@/src/infastructure/errors/errors";
import { ClientResponseDTO } from "@/src/application/dtos/response.dto";

export const resetPasswordUseCase = {
  async execute(
    newPassword: string,
    token: string
  ): Promise<ClientResponseDTO> {
    // DI
    const passwordResetTokenRepository = getInjection(
      "IPasswordResetTokenRepository"
    );
    const userRepository = getInjection("IUserRepository");
    const hashingService = getInjection("IHashingService");

    // Check if token exists
    const existingPasswordResetTokenDocument =
      await passwordResetTokenRepository.getByToken(token);
    if (!existingPasswordResetTokenDocument) {
      throw new UnauthenticatedError(
        "The provided token is invalid or has already been used. Please request a new password reset link."
      );
    }

    // Check if token has expired
    const currentDate = new Date();
    if (existingPasswordResetTokenDocument.expires < currentDate) {
      throw new UnauthenticatedError(
        "The password reset token has expired. Please request a new link to reset your password."
      );
    }

    // Check if user exists
    const existingUserDocument = await userRepository.getByEmail(
      existingPasswordResetTokenDocument.email
    );
    if (!existingUserDocument) {
      throw new AuthenticationError(
        "No user found associated with this email address. Please check the email and try again."
      );
    }

    // Hash new password
    const newHashedPassword = await hashingService.hash(newPassword);

    // Update user password
    await userRepository.update(existingUserDocument.id, {
      password: newHashedPassword,
    });

    // Delete the reset token from DB
    await passwordResetTokenRepository.deleteById(
      existingPasswordResetTokenDocument.id
    );

    return {
      success: true,
      message:
        "Your password has been successfully reset. You can now log in with your new password.",
    };
  },
};
