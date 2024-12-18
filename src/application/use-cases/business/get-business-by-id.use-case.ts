import { getInjection } from "@/di/container";
import { checkValidSessionUseCase } from "../check-valid-session";
import { NotFoundError } from "@/src/domain/errors/errors";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";

export const getBusinessByIdUseCase = {
  async execute(id: string) {
    // di
    const businessRepository = getInjection("IBusinessRepository");

    // validate user session
    const existingUser = await checkValidSessionUseCase.execute();

    // check if business exists
    const existingBusinessDocument = await businessRepository.getById(id);

    if (!existingBusinessDocument) {
      throw new NotFoundError(
        `No business found with the provided ID: ${id}. Please ensure the ID is correct.`
      );
    }

    // verify if the business belongs to the current user
    if (existingBusinessDocument.userId !== existingUser.id) {
      throw new UnauthorizedError(
        "You do not have the necessary permissions to access this workspace. Please ensure you're accessing your own business profile."
      );
    }

    return existingBusinessDocument;
  },
};
