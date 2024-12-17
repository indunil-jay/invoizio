import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import {
  CreateNewPasswordRequestDTO,
  newPasswordSchema,
} from "@/src/application/dtos/user.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { resetPasswordUseCase } from "@/src/application/use-cases/authentication/reset-password.use-case";
import { UnauthenticatedError } from "@/src/infastructure/errors/errors";

export const resetPasswordController = async (
  input: CreateNewPasswordRequestDTO,
  token: string | undefined
): Promise<ClientResponseDTO> => {
  if (!token) {
    throw new UnauthenticatedError(
      "Authentication token is required. Please provide a valid token to proceed with resetting your password."
    );
  }

  const { data, error: inputParseError } = newPasswordSchema.safeParse(input);

  if (inputParseError) {
    throw new BadRequestError(
      "There was an issue processing your request. Please ensure the provided data is in the correct format."
    );
  }

  return await resetPasswordUseCase.execute(data.password, token);
};
