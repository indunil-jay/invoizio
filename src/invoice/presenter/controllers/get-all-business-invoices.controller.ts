import { getAllBusinessInvoicesUseCase } from "@/src/invoice/application/use-cases/get-all-business-invoices.usecase";

export const getAllBusinessInvoicesController = async (businessId: string) => {
    const invoices = await getAllBusinessInvoicesUseCase.execute(businessId);
    return JSON.stringify(invoices);
};
