import { getInjection } from "@/di/container";
import {
    BusinessNotFoundException,
    BusinessUpdateUnauthorizedException,
} from "@/src/business/application/exceptions/specific.exception";

export const deleteBusinessUseCase = {
    async execute(id: string) {
        const { authenticationService, businessRepository } =
            this.getServices();

        const user = await authenticationService.verifySessionUser();

        const existingBusiness = await businessRepository.get(id);

        if (!existingBusiness) {
            throw new BusinessNotFoundException();
        }

        if (existingBusiness.userId !== user.id) {
            throw new BusinessUpdateUnauthorizedException();
        }

        await businessRepository.remove(id);
    },
    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            businessRepository: getInjection("IBusinessRepository"),
        };
    },
};
