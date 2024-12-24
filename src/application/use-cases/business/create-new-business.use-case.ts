import { getInjection } from "@/di/container";
import { CreateBusinessDTO } from "@/src/application/dtos/business.dto";
import { checkValidSessionUseCase } from "@/src/application/use-cases/authentication/check-valid-session";

export const createNewBusinessUseCase = {
  async execute(data: CreateBusinessDTO) {
    // DI
    const businessRepository = getInjection("IBusinessRepository");
    const businessAddressRepository = getInjection(
      "IBusinessAddressRepository"
    );
    const transactionManagerService = getInjection(
      "ITransactionManagerService"
    );

    // Check session
    const sessionUser = await checkValidSessionUseCase.execute();

    // Upload service // TODO:add image service
    const imgUrl = "";

    try {
      // Create business and address within a transaction
      const result = await transactionManagerService.startTransaction(
        async (tx) => {
          try {
            const newBusinessDocument = await businessRepository.create(
              {
                name: data.name,
                userId: sessionUser.id,
                image: imgUrl,
              },
              tx
            );

            const newBusinessAddressDocument =
              await businessAddressRepository.create(
                {
                  businessId: newBusinessDocument.id,
                  addressLine1: data.address.addressLine1,
                  addressLine2: data.address.addressLine2,
                  city: data.address.city,
                  postalCode: data.address.postalCode,
                },
                tx
              );

            return {
              newBusinessDocument,
              newBusinessAddressDocument,
            };
          } catch (error) {
            console.error(
              `TRANSACTION_ERROR::createNewBusinessUseCase::${error}`
            );
            tx.rollback();
            throw error;
          }
        }
      );

      return {
        success: true,
        message: "The business profile has been created successfully.",
        newBusinessDocument: {
          ...result.newBusinessDocument,
          address: result.newBusinessAddressDocument,
        },
      };
    } catch (error) {
      console.error(`createNewBusinessUseCase::${error}`);
      return {
        success: false,
        message: `Something went wrong. Database Transaction failed, Our team has been notified and is working to resolve the issue. Please try again later.`,
      };
    }
  },
};
