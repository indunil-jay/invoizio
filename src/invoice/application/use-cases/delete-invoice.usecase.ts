import { getInjection } from "@/di/container";

export const deleteInvoiceUseCase = {
    async execute(invoiceId: string) {
        const { authenticationService, invoiceRepository } = this.getServices();
        await authenticationService.verifySessionUser();

        await invoiceRepository.remove(invoiceId);
    },
    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            invoiceRepository: getInjection("IInvoiceRepository"),
        };
    },
};
