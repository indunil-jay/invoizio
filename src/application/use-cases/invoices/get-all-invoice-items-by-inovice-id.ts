import { getInjection } from "@/di/container";
import { checkValidSessionUseCase } from "../authentication/check-valid-session";

export const getAllInvoiceItemsByInvoiceIdUseCase = {
    async execute(invoiceId: string) {
        const invoiceItemsRepository = getInjection("IInvoiceItemsRepository");

        await checkValidSessionUseCase.execute();

        return await invoiceItemsRepository.getAll(invoiceId);
    },
};
