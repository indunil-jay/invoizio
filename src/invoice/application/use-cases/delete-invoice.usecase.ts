import { getInjection } from "@/di/container";
import { InvoiceNotFoundException } from "../execeptions/specific.exception";

export const deleteInvoiceUseCase = {
    async execute(invoiceId: string) {
        const { authenticationService, invoiceRepository } = this.getServices();
        await authenticationService.verifySessionUser();
        const invoice = invoiceRepository.get(invoiceId);
        if (!invoice) {
            throw new InvoiceNotFoundException();
        }
        await invoiceRepository.remove(invoiceId);
    },
    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            invoiceRepository: getInjection("IInvoiceRepository"),
        };
    },
};
