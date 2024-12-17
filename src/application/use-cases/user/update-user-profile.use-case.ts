import { getInjection } from "@/di/container";
import { UpdateUserProfileRequestDTO } from "@/src/application/dtos/user.dto";
import { ConflictError, NotFoundError } from "@/src/domain/errors/errors";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";
import { generateVerificationTokenAndSendEmailUseCase } from "../authentication/generate-verification-token-send-email.use-case";
import { ClientResponseDTO } from "../../dtos/response.dto";

export const updateUserProfileUseCase = {
  async execute(data: UpdateUserProfileRequestDTO): Promise<ClientResponseDTO> {
    // DI
    const authenticationService = getInjection("IAuthenticationService");
    const userRepository = getInjection("IUserRepository");

    // Verify if the session is valid
    const session = await authenticationService.getSession();
    if (!session || !session.user || !session.user.id) {
      throw new UnauthorizedError(
        "Your session is invalid or has expired. Please log in again to continue."
      );
    }

    // Check if the user exists in the system
    const existingUserDocument = await userRepository.getById(session.user.id);

    if (!existingUserDocument) {
      throw new NotFoundError(
        "We couldn't find your user account. Please log in and try again."
      );
    }

    // Update email if provided
    if (data.email) {
      const existingEmailDocument = await userRepository.getByEmail(data.email);

      if (existingEmailDocument?.email === existingUserDocument.email) {
        throw new ConflictError(
          "this email is current address,please use different one."
        );
      }

      if (existingEmailDocument) {
        throw new ConflictError(
          "The requested email already exists. Please delete that account or provide a different email."
        );
      }

      await userRepository.update(existingUserDocument.id, {
        email: data.email,
        emailVerified: null,
      });

      return await generateVerificationTokenAndSendEmailUseCase(data.email);
    }

    // Update name if provided
    if (data.name) {
      console.log(data.name);
      await userRepository.update(existingUserDocument.id, {
        name: data.name,
      });

      return {
        success: true,
        message: "Your username has been updated successfully.",
      };
    }

    // Default return for invalid or empty updates
    return {
      success: false,
      message: "No valid fields were provided to update.",
    };
  },
};
