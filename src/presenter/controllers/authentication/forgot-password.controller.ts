import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import {
  PasswordResetDTO,
  passwordResetSchema,
} from "@/src/application/dtos/user.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { forgotPasswordUseCase } from "@/src/application/use-cases/authentication/forgot-password.use-case";

export const forgotPasswordController = async (
  values: PasswordResetDTO
): Promise<ClientResponseDTO> => {
  const { data, error: inputParseError } =
    passwordResetSchema.safeParse(values);

  if (inputParseError) {
    throw new BadRequestError("password reset email parse error");
  }

  return await forgotPasswordUseCase.execute(data.email);
};
