import { getAllInvoiceItemsByInvoiceIdUseCase } from "@/src/application/use-cases/invoices/get-all-invoice-items-by-inovice-id";

export const getAllInvoiceItemsByInvoiceIdController = async (
    invoiceId: string
) => {
    if (!invoiceId || typeof invoiceId !== "string") {
        throw new Error("Invalid inovice ID.");
    }

    return await getAllInvoiceItemsByInvoiceIdUseCase.execute(invoiceId);
};
