import { getAllInvoicesByBusinessIdUseCase } from "@/src/application/use-cases/invoices/get-all-invoices-by-business-id.use-case";

export const getAllInvoicesByBusinessIdController = async (
  businessId: string
) => {
  if (!businessId || typeof businessId !== "string") {
    throw new Error("Invalid business ID.");
  }
  return await getAllInvoicesByBusinessIdUseCase(businessId);
};
