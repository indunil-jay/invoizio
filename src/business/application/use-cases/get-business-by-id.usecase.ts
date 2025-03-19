import { getInjection } from "@/di/container";
import { BusinessNotFoundException } from "../exceptions/specific.exception";

export const getBusinessByIdUseCase = {
    async execute(id: string) {
        const authenticationService = getInjection("IAuthenticationService");
        const businessRepository = getInjection("IBusinessRepository");
        // verify user
        await authenticationService.verifySessionUser();

        const business = await businessRepository.get(id);

        if (!business) {
            throw new BusinessNotFoundException();
        }

        return business;
    },
};
