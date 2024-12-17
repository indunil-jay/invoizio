import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import { emailVerifyUseCase } from "@/src/application/use-cases/authentication/email-verify.use-case";

export const emailVerificationController = async (
  token: string
): Promise<ClientResponseDTO> => {
  return await emailVerifyUseCase.execute(token);
};
