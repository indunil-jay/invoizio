import { getInjection } from "@/di/container";

export const getAllBusinessInvoicesUseCase = {
    async execute(businessId: string) {
        const { invoiceRepository, authenticationService, clientRepository } =
            this.getServices();
        await authenticationService.verifySessionUser();
        const invoices = await invoiceRepository.getAll(businessId);

        const businessAllInvoices = await Promise.all(
            invoices.map(async (invoice) => {
                const client = await clientRepository.get(invoice.clientId);
                return {
                    ...invoice,
                    client,
                    lastEmailSentAt: invoice.lastEmailSentAt,
                };
            })
        );

        return businessAllInvoices;
    },
    getServices() {
        return {
            invoiceRepository: getInjection("IInvoiceRepository"),
            authenticationService: getInjection("IAuthenticationService"),
            clientRepository: getInjection("IClientRepository"),
        };
    },
};
