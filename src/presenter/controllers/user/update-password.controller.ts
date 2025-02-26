import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import {
  UpdatePasswordDTO,
  updatePasswordSchema,
} from "@/src/application/dtos/user.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { updatePasswordUseCase } from "@/src/application/use-cases/user/update-password.use-case";

export const updatePasswordController = async (
  input: UpdatePasswordDTO
): Promise<ClientResponseDTO> => {
  const { data, error: inputParseError } =
    updatePasswordSchema.safeParse(input);

  if (inputParseError) {
    throw new BadRequestError(inputParseError.message);
  }
  return await updatePasswordUseCase.execute(data);
};
