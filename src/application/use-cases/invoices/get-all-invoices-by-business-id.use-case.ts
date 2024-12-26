import { getInjection } from "@/di/container";
import { checkValidSessionUseCase } from "../authentication/check-valid-session";
import { ConflictError } from "@/src/domain/errors/errors";

export const getAllInvoicesByBusinessIdUseCase = async (businessId: string) => {
  // DI
  const invoicesRepository = getInjection("IInvoiceRepository");
  const clientsAddressRepository = getInjection("IClientAddressRepository"); // Assuming you have a client repository

  // Check valid session
  await checkValidSessionUseCase.execute();

  // Fetch all invoices for the business
  const invoicesList = await invoicesRepository.getAllByBusinessId(businessId);

  // Fetch the client details for each invoice and add them to the result
  const invoicesDocumentList = await Promise.all(
    invoicesList.map(async (invoice) => {
      // Fetch the client details by clientId
      const clientAddress = await clientsAddressRepository.getById(
        invoice.clientId
      ); // Assuming the method to fetch client by ID is 'getById'

      if (!clientAddress) {
        throw new ConflictError("User address is missing");
      }
      // Return the invoice with client address details
      return {
        ...invoice,
        client: {
          ...invoice.client,
          address: clientAddress,
        },
      };
    })
  );

  return invoicesDocumentList;
};
