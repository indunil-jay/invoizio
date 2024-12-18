import { getInjection } from "@/di/container";
import { checkValidSessionUseCase } from "../check-valid-session";
import { NotFoundError } from "@/src/domain/errors/errors";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";

export const deleteBusinessByIdUseCase = {
  async execute(id: string) {
    // di
    const businessRepository = getInjection("IBusinessRepository");

    // check valid session
    const existingUser = await checkValidSessionUseCase.execute();

    // check existing business document
    const existingBusinessDocument = await businessRepository.getById(id);

    if (!existingBusinessDocument) {
      throw new NotFoundError(
        "Business not found. Please check the ID and try again."
      );
    }

    // check user permissions
    if (existingBusinessDocument.userId !== existingUser.id) {
      throw new UnauthorizedError(
        "You do not have permission to delete this business."
      );
    }

    // Delete business
    await businessRepository.deleteById(id);

    return {
      success: true,
      message: "The business has been successfully deleted.",
    };
  },
};
