import { getInjection } from "@/di/container";

export const signOutUseCase = {
  async execute() {
    const authenticationService = getInjection("IAuthenticationService");
    await authenticationService.signOut();
  },
};
