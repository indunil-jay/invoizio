import { deleteInvoiceByIdUseCase } from "@/src/application/use-cases/invoices/delete-invoice-by-id.use-case";

export const deleteInvoiceByIdController = async (invoiceId: string) => {
  if (!invoiceId || typeof invoiceId !== "string") {
    throw new Error("Missing or Invalid business ID.");
  }

  return await deleteInvoiceByIdUseCase(invoiceId);
};
