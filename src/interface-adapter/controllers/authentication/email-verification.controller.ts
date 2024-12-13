import { emailVerifyUseCase } from "@/src/application/use-cases/email-verify.use-case";

export const emailVerificationController = async (token: string) => {
  await emailVerifyUseCase(token);
};
