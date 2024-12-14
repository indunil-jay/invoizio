import { getInjection } from "@/di/container";
import { PASSWORD_RESET_TOKEN_EXPIRATION_MS } from "@/src/constants";

export const forgotPasswordUseCase = async (email: string) => {
  //check email exists
  const userRepository = getInjection("IUserRepository");
  const existingUserDocument = await userRepository.getByEmail(email);

  if (!existingUserDocument) {
    console.log("email not exists");
    throw new Error("user does not exitss");
  }

  //const generate token and send a email
  const emailService = getInjection("IEmailService");

  const tokenGeneratorService = getInjection("ITokenGeneratorService");
  const token = tokenGeneratorService.generate();

  // Get the current date for comparisons
  const currentDate = new Date();

  // Set new expiration time (10 minutes)
  const expires = new Date(
    currentDate.getTime() + PASSWORD_RESET_TOKEN_EXPIRATION_MS
  );

  //check if there existing document
  const passwordResetTokenRepository = getInjection(
    "IPasswordResetTokenRepository"
  );
  const existingPasswordResetTokenDocument =
    await passwordResetTokenRepository.getByEmail(existingUserDocument.email);

  // Check if token exists and has not expired
  if (
    existingPasswordResetTokenDocument &&
    existingPasswordResetTokenDocument.expires > currentDate
  ) {
    console.log(
      "A password reset link already has been sent to your inbox. Please check your email."
    );
    return "A password reset link already has been sent to your inbox. Please check your email.";
  }

  // Check if token exists and has expired
  if (
    existingPasswordResetTokenDocument &&
    existingPasswordResetTokenDocument.expires < currentDate
  ) {
    //TODO:database transactins
    await passwordResetTokenRepository.deleteById(
      existingPasswordResetTokenDocument.id
    );

    const newPasswordResetTokenDocument =
      await passwordResetTokenRepository.create({
        token,
        email,
        expires,
      });
    await emailService.sendPasswordResetEmail(
      newPasswordResetTokenDocument.email,
      newPasswordResetTokenDocument.token
    );
    console.log(
      "Your previous password reset link expired. A new one has been sent to your inbox."
    );
    return "Your previous password reset link expired. A new one has been sent to your inbox.";
  }

  // Create new verification token document
  const newPasswordResetTokenDocument =
    await passwordResetTokenRepository.create({
      token: token,
      email,
      expires,
    });

  await emailService.sendPasswordResetEmail(
    newPasswordResetTokenDocument.email,
    newPasswordResetTokenDocument.token
  );
  console.log(
    "A password reset link has been sent to your inbox. Please check your email."
  );
  return "A password reset link has been sent to your inbox. Please check your email.";
};
