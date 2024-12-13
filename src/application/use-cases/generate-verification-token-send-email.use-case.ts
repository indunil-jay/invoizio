import { getInjection } from "@/di/container";
import { TOKEN_EXPIRATION_MS } from "@/src/constants";

//TODO:add emails later

export const generateVerificationTokenAndSendEmailUseCase = async (
  email: string
) => {
  const verificationTokenRepository = getInjection(
    "IVerificationTokenRepository"
  );

  const emailService = getInjection("IEmailService");

  // Get the current date for comparisons
  const currentDate = new Date();
  // Generate a new token
  const tokenGeneratorService = getInjection("ITokenGeneratorService");
  const token = tokenGeneratorService.generate();

  // Set new expiration time (10 minutes)
  const expires = new Date(currentDate.getTime() + TOKEN_EXPIRATION_MS);

  // Check if existing token and is expired
  const existingverificationTokenDocument =
    await verificationTokenRepository.getByEmail(email);

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

    const newVerificationTokenDocument =
      await verificationTokenRepository.create({
        token: token,
        email,
        expires,
      });
    await emailService.sendVerificationEmail(
      newVerificationTokenDocument.email,
      newVerificationTokenDocument.token
    );
    console.log(
      "Your previous verification link expired. A new one has been sent to your inbox."
    );
    return "Your previous verification link expired. A new one has been sent to your inbox.";
  }

  // Create new verification token document
  const newVerificationTokenDocument = await verificationTokenRepository.create(
    {
      token: token,
      email,
      expires,
    }
  );

  await emailService.sendVerificationEmail(
    newVerificationTokenDocument.email,
    newVerificationTokenDocument.token
  );
  console.log(
    "A verification link has been sent to your inbox. Please check your email."
  );
  return "A verification link has been sent to your inbox. Please check your email.";
};
