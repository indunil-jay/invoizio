import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import {
  CreateUserRequestDTO,
  createUserSchema,
} from "@/src/application/dtos/user.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { signUpUseCase } from "@/src/application/use-cases/authentication/sign-up.usecase";

export const signUpController = async (
  input: CreateUserRequestDTO
): Promise<ClientResponseDTO> => {
  const { error: inputParseError, data } = createUserSchema.safeParse(input);

  if (inputParseError) {
    throw new BadRequestError("Invalid input data", { cause: inputParseError });
  }
  return await signUpUseCase.execute(data);
};
