import { getInjection } from "@/di/container";
import { UpdateBusinessDTO } from "../../dtos/business.dto";
import { checkValidSessionUseCase } from "../check-valid-session";
import { NotFoundError } from "@/src/domain/errors/errors";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";

export const updateBusinessByIdUseCase = {
  async execute(id: string, data: UpdateBusinessDTO) {
    // Dependency injection
    const businessRepository = getInjection("IBusinessRepository");

    // Check valid session
    const existingUser = await checkValidSessionUseCase.execute();

    // Check if business document exists
    const existingBusinessDocument = await businessRepository.getById(id);

    if (!existingBusinessDocument) {
      throw new NotFoundError(
        "The business document does not exist. Please verify the ID and try again."
      );
    }

    // Check if user has permission to update
    if (existingBusinessDocument.userId !== existingUser.id) {
      throw new UnauthorizedError(
        "You do not have permission to update this business."
      );
    }

    // TODO: Upload image URL
    const imageUrl = "";

    // Update business document
    const updatedBusinessDocument = await businessRepository.update(id, {
      name: data.name,
      image: imageUrl,
    });

    return {
      success: true,
      message: "The business details have been successfully updated.",
      updatedBusinessDocument,
    };
  },
};
