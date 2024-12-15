import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import {
  PasswordResetRequestDTO,
  passwordResetSchema,
} from "@/src/application/dtos/user.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { forgotPasswordUseCase } from "@/src/application/use-cases/forgot-password.use-case";

export const forgotPasswordController = async (
  values: PasswordResetRequestDTO
): Promise<ClientResponseDTO> => {
  const { data, error: inputParseError } =
    passwordResetSchema.safeParse(values);

  if (inputParseError) {
    throw new BadRequestError("password reset email parse error");
  }

  return await forgotPasswordUseCase(data.email);
};
