import { getInjection } from "@/di/container";

export const createInvoiceUseCase = {
    async execute() {
        const { authenticationService } = this.getServices();
        // verify the user
        const user = await authenticationService.verifySessionUser();
    },
    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
        };
    },
};
