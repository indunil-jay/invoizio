import { getInjection } from "@/di/container";

export const getAllBusinessesUseCase = {
    async execute() {
        const authenticationService = getInjection("IAuthenticationService");
        const businessRepository = getInjection("IBusinessRepository");
        //check if session is valid
        const user = await authenticationService.verifySessionUser();
        //return data
        return await businessRepository.getAll(user.id);
    },
};
