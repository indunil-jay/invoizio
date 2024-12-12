import { getInjection } from "@/di/container";

export const signInWithGoogleUseCase = {
  async execute() {
    const authenticationService = getInjection("IAuthenticationService");
    return await authenticationService.signInWithGoogle();
  },
};
