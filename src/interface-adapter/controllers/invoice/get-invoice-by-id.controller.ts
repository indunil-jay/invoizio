import { getInvoiceByIdUseCase } from "@/src/application/use-cases/invoices/get-invoice-by-id.use-case";

export const getInvoiceByIdController = async (invoiceId: string) => {
    if (!invoiceId || typeof invoiceId !== "string") {
        throw new Error("Invalid Invoice Id ID.");
    }
    const invoice = await getInvoiceByIdUseCase.execute(invoiceId);

    return invoice;
};
