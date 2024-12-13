import { getInjection } from "@/di/container";

export const emailVerifyUseCase = async (token: string) => {
  // Inject dependencies
  const verificationTokenRepository = getInjection(
    "IVerificationTokenRepository"
  );
  const userRepository = getInjection("IUserRepository");

  // Check if the token exists
  const existingVerificationTokenDocument =
    await verificationTokenRepository.getByToken(token);
  if (!existingVerificationTokenDocument) {
    throw new Error("The provided token is invalid or does not exist.");
  }

  // Check if the token has expired
  if (existingVerificationTokenDocument.expires < new Date()) {
    throw new Error(
      "The token has expired. Please request a new verification link."
    );
  }

  // Validate the user associated with the token
  const existingUserDocument = await userRepository.getByEmail(
    existingVerificationTokenDocument.email
  );
  if (!existingUserDocument) {
    throw new Error("No user found associated with this email.");
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

  console.log("Email verification successful.");
  return "Your email has been successfully verified.";
};
