import { getInjection } from "@/di/container";

export const updateInvoiceStatusUseCase = {
    async execute(invoiceId: string, statusId: number) {
        const { authenticationService, invoiceRepository } = this.getServices();
        await authenticationService.verifySessionUser();
        return await invoiceRepository.update(invoiceId, { statusId });
    },

    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            invoiceRepository: getInjection("IInvoiceRepository"),
        };
    },
};
