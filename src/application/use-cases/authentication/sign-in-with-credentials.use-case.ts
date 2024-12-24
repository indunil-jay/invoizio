import { getInjection } from "@/di/container";
import { AuthenticationError } from "@/src/infastructure/errors/errors";
import { SignInUserDTO } from "@/src/application/dtos/user.dto";
import { generateVerificationTokenAndSendEmailUseCase } from "@/src/application/use-cases/authentication/generate-verification-token-send-email.use-case";

export const signInWithCredentialsUseCase = {
  async execute(data: SignInUserDTO) {
    // DI
    const hashingService = getInjection("IHashingService");
    const userRepository = getInjection("IUserRepository");
    const authenticationService = getInjection("IAuthenticationService");

    // Check if user exists
    const existingUser = await userRepository.getByEmail(data.email);

    if (!existingUser || !existingUser.password) {
      throw new AuthenticationError(
        "Invalid credentials. Please check your email and password and try again."
      );
    }

    // Verify password
    const isMatchingPassword = await hashingService.compare(
      data.password,
      existingUser.password
    );

    if (!isMatchingPassword) {
      throw new AuthenticationError(
        "Incorrect password. Please ensure it's the correct password and try again."
      );
    }

    // Check if email is verified
    if (!existingUser.emailVerified) {
      return await generateVerificationTokenAndSendEmailUseCase(
        existingUser.email
      );
    }

    // Proceed with sign-in
    await authenticationService.signInWithCredentials(data);

    return {
      success: true,
      message: "Successfully signed in. Welcome back!",
    };
  },
};
