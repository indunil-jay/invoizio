import { getInjection } from "@/di/container";
import { generateVerificationTokenAndSendEmailUseCase } from "@/src/application/use-cases/authentication/generate-verification-token-send-email.use-case";
import { CreateUserRequestDTO } from "@/src/application/dtos/user.dto";
import { ClientResponseDTO } from "@/src/application/dtos/response.dto";
import { AuthenticationError } from "@/src/infastructure/errors/errors";

export const signUpUseCase = {
  async execute(data: CreateUserRequestDTO): Promise<ClientResponseDTO> {
    //di
    const userRepository = getInjection("IUserRepository");
    const hashingService = getInjection("IHashingService");

    // check if user already exists
    const userDocument = await userRepository.getByEmail(data.email);

    if (userDocument) {
      throw new AuthenticationError("email already exists", {
        statusCode: 409,
      });
    }

    //hash the password
    const hashedPassword = await hashingService.hash(data.password);

    //insert
    const newUserDocument = await userRepository.create({
      email: data.email,
      password: hashedPassword,
      name: data.email,
    });

    //generate verification token
    return await generateVerificationTokenAndSendEmailUseCase(
      newUserDocument.email
    );
  },
};
