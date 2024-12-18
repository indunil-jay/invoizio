import {
  UpdateBusinessRequestDTO,
  updateBusinessSchema,
} from "@/src/application/dtos/business.dto";
import { BadRequestError } from "@/src/application/errors/errors";
import { updateBusinessByIdUseCase } from "@/src/application/use-cases/business/update-business-by-id.use-case";

export const updateBusinessByIdController = async (
  id: string,
  input: UpdateBusinessRequestDTO
) => {
  const { data, error: inputParseError } =
    updateBusinessSchema.safeParse(input);
  if (inputParseError) {
    throw new BadRequestError(
      "There was a validation error. Please check your input and try again."
    );
  }

  return await updateBusinessByIdUseCase.execute(id, data);
};
