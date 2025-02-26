import { INVOICE_STATUS } from "@/src/application/enums/invoice-status.enum";
import { BadRequestError } from "@/src/application/errors/errors";
import { updateInvoiceStatusByIdUseCase } from "@/src/application/use-cases/invoices/update-invoice-status-by-id.use-case";

export const updateInvoiceStatusByIdController = async (
  invoiceId: string,
  status: INVOICE_STATUS
) => {
  if (!invoiceId || !status) {
    throw new BadRequestError("Missing fields");
  }
  return await updateInvoiceStatusByIdUseCase(invoiceId, status);
};
