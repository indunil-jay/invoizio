import { getInjection } from "@/di/container";
import { checkValidSessionUseCase } from "../authentication/check-valid-session";

export const getInvoiceByIdUseCase = {
    async execute(invoiceId: string) {
        const invoicesRepository = getInjection("IInvoiceRepository");
        // Check valid session
        await checkValidSessionUseCase.execute();

        return await invoicesRepository.getById(invoiceId);
    },
};
