import { getInjection } from "@/di/container";
import { checkValidSessionUseCase } from "../authentication/check-valid-session";
import { NotFoundError } from "@/src/domain/errors/errors";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";

export const sendClientPaymentReminderUseCase = {
  async execute(invoiceId: string) {
    //di
    const emailService = getInjection("IEmailService");
    const clinetsRepository = getInjection("IClientRepository");
    const invoicesRepository = getInjection("IInvoiceRepository");
    const businessRepository = getInjection("IBusinessRepository");

    //check session
    const sessionUser = await checkValidSessionUseCase.execute();

    //get clients
    const invoiceDocument = await invoicesRepository.getById(invoiceId);
    if (!invoiceDocument) {
      throw new NotFoundError(
        "The requested invoice does not exist. Please verify the invoice ID and try again."
      );
    }

    const clientDocument = await clinetsRepository.getById(
      invoiceDocument.clientId
    );

    if (!clientDocument) {
      throw new NotFoundError(
        "The client associated with the invoice could not be found. Please verify and try again."
      );
    }

    //check permisiion
    const businessDocument = await businessRepository.getById(
      invoiceDocument.businessId
    );

    if (!businessDocument) {
      throw new NotFoundError(
        "The business associated with the invoice could not be found. Please verify and try again."
      );
    }

    if (businessDocument.userId !== sessionUser.id) {
      throw new UnauthorizedError(
        "You do not have permission to delete this invoice."
      );
    }
    //send email
    await emailService.sendPaymentReminderEmail(clientDocument.email);

    return {
      success: true,
      message:
        "Payment reminder email has been sent to the this invoice associate client.",
    };
  },
};
