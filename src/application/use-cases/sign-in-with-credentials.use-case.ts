import { getInjection } from "@/di/container";
import { SignInInput } from "@/drizzle/schemas/user";

export const signInWithCredentialsUseCase = {
  async execute(data: SignInInput) {
    //check if user exists
    const userRepository = getInjection("IUserRepository");
    const existingUser = await userRepository.getByEmail(data.email);

    if (!existingUser || !existingUser.password) {
      throw new Error("Invalid credentials.");
    }

    //check password is match
    const hashingService = getInjection("IHashingService");
    const isMatchingPassword = await hashingService.compare(
      data.password,
      existingUser.password
    );

    if (!isMatchingPassword) {
      throw new Error("Invalid credentials.");
    }

    //sign in
    const authenticationService = getInjection("IAuthenticationService");
    await authenticationService.signInWithCredentials(data);
  },
};
