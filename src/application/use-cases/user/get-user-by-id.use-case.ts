import { getInjection } from "@/di/container";
import { NotFoundError } from "@/src/domain/errors/errors";

export const getUserByIdUseCase = {
  async execute(id: string) {
    const userRepository = getInjection("IUserRepository");
    //check document exists
    const existingUserDocument = await userRepository.getById(id);

    if (!existingUserDocument) {
      throw new NotFoundError("no user document exits.");
    }

    return existingUserDocument;
  },
};
