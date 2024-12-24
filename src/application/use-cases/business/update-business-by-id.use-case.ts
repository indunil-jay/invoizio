import { getInjection } from "@/di/container";
import { UpdateBusinessDTO } from "../../dtos/business.dto";
import { checkValidSessionUseCase } from "@/src/application/use-cases/authentication/check-valid-session";
import { NotFoundError } from "@/src/domain/errors/errors";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";

export const updateBusinessByIdUseCase = {
  async execute(id: string, data: UpdateBusinessDTO) {
    // Dependency injection
    const businessRepository = getInjection("IBusinessRepository");
    const businessAddressRepository = getInjection(
      "IBusinessAddressRepository"
    );
    const transactionManagerService = getInjection(
      "ITransactionManagerService"
    );
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

    try {
      const result = await transactionManagerService.startTransaction(
        async (tx) => {
          try {
            // Update business document
            const updatedBusinessDocument = await businessRepository.update(
              id,
              {
                name: data.name,
                image: imageUrl,
              },
              tx
            );

            const updatedBusinessAddressDocument =
              await businessAddressRepository.update(
                id,
                {
                  addressLine1: data.address?.addressLine1,
                  addressLine2: data.address?.addressLine2,
                  city: data.address?.city,
                  postalCode: data.address?.postalCode,
                },
                tx
              );

            return {
              updatedBusinessDocument,
              updatedBusinessAddressDocument,
            };
          } catch (error) {
            tx.rollback();
            throw error;
          }
        }
      );
      return {
        success: true,
        message: "The business details have been successfully updated.",
        updatedBusinessDocument: {
          ...result.updatedBusinessDocument,
          address: result.updatedBusinessAddressDocument,
        },
      };
    } catch (error) {
      console.error(`updateBusinessUseCase::${error}`);
      return {
        success: false,
        message: `Something went wrong. Database Transaction failed, Our team has been notified and is working to resolve the issue. Please try again later.`,
      };
    }
  },
};
