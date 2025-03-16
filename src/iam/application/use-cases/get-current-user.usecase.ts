import { getInjection } from "@/di/container";

export const getCurrentUserUseCase = {
    async execute() {
        const authenticationService = getInjection("IAuthenticationService");
        const user = await authenticationService.verifySessionUser();

        return user;
    },
};
