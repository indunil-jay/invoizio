import { getInjection } from "@/di/container";

export const resetPasswordUseCase = async (
  newPassword: string,
  token: string
) => {
  //check if token is exist
  const passwordResetTokenRepository = getInjection(
    "IPasswordResetTokenRepository"
  );
  const existingPasswordResetTokenDocument =
    await passwordResetTokenRepository.getByToken(token);

  if (!existingPasswordResetTokenDocument) {
    throw new Error("Invalid token");
  }

  //check token has expired
  const currentDate = new Date();
  if (
    existingPasswordResetTokenDocument &&
    existingPasswordResetTokenDocument.expires < currentDate
  ) {
    console.log("token has expired");
    throw new Error("token has expired.");
  }

  //check use existens
  const userRepository = getInjection("IUserRepository");
  const existingUserDocument = await userRepository.getByEmail(
    existingPasswordResetTokenDocument.email
  );

  if (!existingUserDocument) {
    throw new Error("user email does not exists.");
  }

  //hashe new passowrd
  const hashingService = getInjection("IHashingService");
  const newHashedPassword = await hashingService.hash(newPassword);

  //update user password
  await userRepository.update(existingUserDocument.id, {
    password: newHashedPassword,
  });

  //delete the reset-token form db
  await passwordResetTokenRepository.deleteById(
    existingPasswordResetTokenDocument.id
  );

  console.log("password reset successfully");
  return "Password reset successfully.";
};
