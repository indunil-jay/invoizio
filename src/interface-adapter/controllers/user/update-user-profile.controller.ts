import {
  UpdateUserProfileRequestDTO,
  updateUserProfileSchema,
} from "@/src/application/dtos/user.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { updateUserProfileUseCase } from "@/src/application/use-cases/user/update-user-profile.use-case";

export const updateUserProfileController = async (
  input: UpdateUserProfileRequestDTO
) => {
  const { data, error: inputParseError } =
    updateUserProfileSchema.safeParse(input);

  if (inputParseError) {
    throw new BadRequestError(`${inputParseError.message}`);
  }

  return await updateUserProfileUseCase.execute(data);
};
