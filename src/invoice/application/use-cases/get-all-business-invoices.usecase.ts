import { getInjection } from "@/di/container";

export const getAllBusinessInvoicesUseCase = {
    async execute(businessId: string) {
        const { invoiceRepository, authenticationService } = this.getServices();
        await authenticationService.verifySessionUser();
        const invoices = await invoiceRepository.getAll(businessId);

        return invoices;
    },
    getServices() {
        return {
            invoiceRepository: getInjection("IInvoiceRepository"),
            authenticationService: getInjection("IAuthenticationService"),
        };
    },
};
