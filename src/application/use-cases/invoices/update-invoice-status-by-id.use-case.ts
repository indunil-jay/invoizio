import { getInjection } from "@/di/container";
import { INVOICE_STATUS } from "../../enums/invoice-status.enum";
import { checkValidSessionUseCase } from "../authentication/check-valid-session";
import { NotFoundError } from "@/src/domain/errors/errors";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";

export const updateInvoiceStatusByIdUseCase = async (
  invoiceId: string,
  status: INVOICE_STATUS
) => {
  // Dependency Injection
  const invoicesRepository = getInjection("IInvoiceRepository");
  const businessRepository = getInjection("IBusinessRepository");

  // Validate user session
  const sessionUser = await checkValidSessionUseCase.execute();

  // Retrieve the invoice by ID
  const existingInvoiceDocument = await invoicesRepository.getById(invoiceId);

  if (!existingInvoiceDocument) {
    throw new NotFoundError(
      "The specified invoice does not exist. Please check the invoice ID and try again."
    );
  }

  // Retrieve the associated business
  const businessDocument = await businessRepository.getById(
    existingInvoiceDocument.businessId
  );

  if (!businessDocument) {
    throw new NotFoundError(
      "The business associated with the invoice could not be found. Please verify the details and try again."
    );
  }

  // Verify user permissions
  if (businessDocument.userId !== sessionUser.id) {
    throw new UnauthorizedError(
      "You do not have the necessary permissions to modify this invoice."
    );
  }

  await invoicesRepository.update({ statusId: status }, invoiceId);
  return {
    success: true,
    message: "The invoice status has been successfully updated to 'Paid'.",
  };
};
