import { getInjection } from "@/di/container";
import { NotFoundError } from "@/src/domain/errors/errors";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";

export const getAllBusinessUseCase = {
  async execute() {
    //di
    const authenticationService = getInjection("IAuthenticationService");
    const userRepository = getInjection("IUserRepository");
    const businessRepository = getInjection("IBusinessRepository");

    //get user
    const session = await authenticationService.getSession();

    if (!session || !session.user || !session.user.id) {
      throw new UnauthorizedError(
        "Your session is invalid or has expired. Please log in again to continue."
      );
    }

    const existingUserDocument = await userRepository.getById(session.user.id);

    if (!existingUserDocument) {
      throw new NotFoundError(
        "We couldn't find your user account. Please log in and try again."
      );
    }

    return await businessRepository.getAllByUserId(existingUserDocument.id);
  },
};
