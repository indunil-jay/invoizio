import { CreateInvoiceDTO } from "@/src/application/dtos/invoice.dto";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";
import { getInjection } from "@/di/container";
import { checkValidSessionUseCase } from "@/src/application/use-cases/authentication/check-valid-session";

export const createInvoiceUseCase = async (data: CreateInvoiceDTO) => {
  //di
  const businessRepository = getInjection("IBusinessRepository");
  //  check the session
  const currentUser = await checkValidSessionUseCase.execute();

  //check submitted user data and session user is correct
  if (currentUser.id !== data.user.id) {
    throw new UnauthorizedError("User not authorized to create invoice");
  }

  //check the business is the same as the user's business
};
