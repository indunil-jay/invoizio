import { BadRequestError } from "@/src/application/errors/errors";
import { getBusinessByIdUseCase } from "@/src/application/use-cases/business/get-business-by-id.use-case";

export const getBusinessByIdController = async (id: string) => {
  if (!id) {
    throw new BadRequestError(
      "The business ID is required. Please provide a valid ID."
    );
  }

  return await getBusinessByIdUseCase.execute(id);
};
