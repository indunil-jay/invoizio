import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import {
  CreateUserDTO,
  createUserDTOschema,
} from "@/src/application/dtos/user.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { signUpUseCase } from "@/src/application/use-cases/sign-up.usecase";

export const signUpController = async (
  input: CreateUserDTO
): Promise<ClientResponseDTO> => {
  const { error: inputParseError, data } = createUserDTOschema.safeParse(input);

  if (inputParseError) {
    throw new BadRequestError("Invalid input data", { cause: inputParseError });
  }
  return await signUpUseCase.execute(data);
};
