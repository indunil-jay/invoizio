import { getInjection } from "@/di/container";
import { SignUpInput } from "@/drizzle/schemas/user";

export const signUpUseCase = {
  async execute(data: SignUpInput) {
    //check already user inside the database
    const userRepository = getInjection("IUserRepository");
    const userDocument = await userRepository.getByEmail(data.email);

    if (userDocument) {
      throw new Error("user email already exists.");
    }

    //hash the password
    const hashingService = getInjection("IHashingService");
    const hashedPassword = await hashingService.hash(data.password);

    //insert
    await userRepository.create({
      email: data.email,
      password: hashedPassword,
      name: data.email,
    });
  },
};
