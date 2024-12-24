import { getInjection } from "@/di/container";
import { CreateBusinessDTO } from "@/src/application/dtos/business.dto";
import { NotFoundError } from "@/src/domain/errors/errors";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";

export const createNewBusinessUseCase = {
  async execute(data: CreateBusinessDTO) {
    //di
    const authenticationService = getInjection("IAuthenticationService");
    const businessRepository = getInjection("IBusinessRepository");
    const userRepository = getInjection("IUserRepository");

    const session = await authenticationService.getSession();

    if (!session || !session.user || !session.user.id) {
      throw new UnauthorizedError(
        "Your session is invalid or has expired. Please log in again to continue."
      );
    }

    // get user
    const existingUserDocument = await userRepository.getById(session.user.id);

    if (!existingUserDocument) {
      throw new NotFoundError(
        "We couldn't find your user account. Please log in and try again."
      );
    }

    //upload serice //TODO:
    const imgUrl = "";

    //create
    const newBusinessDocument = await businessRepository.create({
      name: data.name,
      userId: existingUserDocument.id,
      image: imgUrl,
    });

    return {
      success: true,
      message: "The business profile has been created successfully.",
      newBusinessDocument,
    };
  },
};
