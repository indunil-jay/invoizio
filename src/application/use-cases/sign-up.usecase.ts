import { getInjection } from "@/di/container";
import { generateVerificationTokenAndSendEmailUseCase } from "@/src/application/use-cases/generate-verification-token-send-email.use-case";
import { createUserDTO } from "@/src/application/dtos/user.dto";
import { ConflictError } from "@/src/domain/errors/errors";
import { ResponseDTO } from "@/src/application/dtos/response.dto";

export const signUpUseCase = {
  async execute(data: createUserDTO): Promise<ResponseDTO> {
    //di
    const userRepository = getInjection("IUserRepository");
    const hashingService = getInjection("IHashingService");

    // check if user already exists
    const userDocument = await userRepository.getByEmail(data.email);

    if (userDocument) {
      throw new ConflictError("email already exists", { statusCode: 409 });
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
