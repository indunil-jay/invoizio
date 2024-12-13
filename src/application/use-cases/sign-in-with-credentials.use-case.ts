import { generateVerificationTokenAndSendEmailUseCase } from "@/src/application/use-cases/generate-verification-token-send-email.use-case";
import { getInjection } from "@/di/container";
import { SignInInput } from "@/drizzle/schemas/user";

export const signInWithCredentialsUseCase = {
  async execute(data: SignInInput) {
    // Check if user exists
    const userRepository = getInjection("IUserRepository");
    const existingUser = await userRepository.getByEmail(data.email);

    if (!existingUser || !existingUser.password) {
      throw new Error(
        "Invalid credentials. Please check your email and password."
      );
    }

    // Verify password
    const hashingService = getInjection("IHashingService");
    const isMatchingPassword = await hashingService.compare(
      data.password,
      existingUser.password
    );

    if (!isMatchingPassword) {
      throw new Error("Incorrect password. Please check and try again.");
    }

    // Check if email is verified
    if (!existingUser.emailVerified) {
      await generateVerificationTokenAndSendEmailUseCase(existingUser.email);
    }
    // Proceed with sign-in
    const authenticationService = getInjection("IAuthenticationService");
    await authenticationService.signInWithCredentials(data);
  },
};
