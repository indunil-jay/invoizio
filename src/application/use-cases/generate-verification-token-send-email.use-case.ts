import { getInjection } from "@/di/container";
import { TOKEN_EXPIRATION_MS } from "@/src/constants";

//TODO:add emails later

export const generateVerificationTokenAndSendEmailUseCase = async (
  email: string
) => {
  // Check if existing token and is expired
  const verificationTokenRepository = getInjection(
    "IVerificationTokenRepository"
  );
  const existingverificationTokenDocument =
    await verificationTokenRepository.getByEmail(email);

  // Get the current date for comparisons
  const currentDate = new Date();
  // Generate a new token
  const tokenGeneratorService = getInjection("ITokenGeneratorService");
  const token = tokenGeneratorService.generate();

  // Set new expiration time (10 minutes)
  const expires = new Date(currentDate.getTime() + TOKEN_EXPIRATION_MS);

  // Check if token exists and has not expired
  if (
    existingverificationTokenDocument &&
    existingverificationTokenDocument.expires > currentDate
  ) {
    console.log(
      "Your email is not verified. A verification link has been sent to your inbox. Please check your email."
    );
    return "Your email is not verified. A verification link has been sent to your inbox. Please check your email.";
  }

  // Check if token exists and has expired
  if (
    existingverificationTokenDocument &&
    existingverificationTokenDocument.expires < currentDate
  ) {
    //TODO:database transactins
    await verificationTokenRepository.deleteById(
      existingverificationTokenDocument.id
    );

    await verificationTokenRepository.create({
      token: token,
      email,
      expires,
    });
    console.log(
      "Your previous verification link expired. A new one has been sent to your inbox."
    );
    return "Your previous verification link expired. A new one has been sent to your inbox.";
  }

  // Create new verification token document
  await verificationTokenRepository.create({
    token: token,
    email,
    expires,
  });
  console.log(
    "A verification link has been sent to your inbox. Please check your email."
  );
  return "A verification link has been sent to your inbox. Please check your email.";
};
