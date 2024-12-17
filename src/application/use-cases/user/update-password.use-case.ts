import { getInjection } from "@/di/container";
import { UpdatePasswordRequestDTO } from "@/src/application/dtos/user.dto";
import { ConflictError, NotFoundError } from "@/src/domain/errors/errors";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";

export const updatePasswordUseCase = {
  async execute(data: UpdatePasswordRequestDTO) {
    // Dependency Injection (DI)
    const authenticationService = getInjection("IAuthenticationService");
    const userRepository = getInjection("IUserRepository");
    const hashingService = getInjection("IHashingService");

    // Verify if the session is valid
    const session = await authenticationService.getSession();
    if (!session || !session.user || !session.user.id) {
      throw new UnauthorizedError(
        "Your session is invalid or has expired. Please log in again to continue."
      );
    }

    console.log({ session: session.user });

    // Check if the user exists in the system
    const existingUserDocument = await userRepository.getById(session.user.id);
    if (!existingUserDocument) {
      throw new NotFoundError(
        "We couldn't find your user account. Please log in and try again."
      );
    }

    // Validate the provided current password
    const isCurrentPasswordCorrect = await hashingService.compare(
      data.currentPassword,
      existingUserDocument.password!
    );
    console.log({ isCurrentPasswordCorrect });

    if (!isCurrentPasswordCorrect) {
      throw new ConflictError(
        "The current password you entered is incorrect. Please try again."
      );
    }

    // Hash the new password
    const hashedNewPassword = await hashingService.hash(data.newPassword);

    // Update the user's password in the repository
    await userRepository.update(existingUserDocument.id, {
      password: hashedNewPassword,
    });

    console.log("Password updated successfully");
    return {
      success: true,
      message: "Your password has been updated successfully.",
    };
  },
};
