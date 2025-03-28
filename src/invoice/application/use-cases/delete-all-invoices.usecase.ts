import { getInjection } from "@/di/container";

export const deleteAllInvoiceUseCase = {
    async execute(ids: string[]) {
        const { authenticationService, invoiceRepository } = this.getServices();
        await authenticationService.verifySessionUser();

        await Promise.all(ids.map((id) => invoiceRepository.remove(id)));
    },

    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            invoiceRepository: getInjection("IInvoiceRepository"),
        };
    },
};
