import { getInjection } from "@/di/container";
import { CreateInvoiceDTO } from "../../dtos/invoice.dto";
import { checkValidSessionUseCase } from "../authentication/check-valid-session";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";
import { ConflictError } from "@/src/domain/errors/errors";

export const updateInvoiceUseCase = {
  async execute(data: CreateInvoiceDTO) {
    // Dependency injection
    const businessRepository = getInjection("IBusinessRepository");
    const transactionManagerService = getInjection(
      "ITransactionManagerService"
    );
    const clientRepository = getInjection("IClientRepository");
    const clientAddressRepository = getInjection("IClientAddressRepository");
    const invoiceRepository = getInjection("IInvoiceRepository");
    const invoiceItemsRepository = getInjection("IInvoiceItemsRepository");

    // Validate session
    const currentUser = await checkValidSessionUseCase.execute();

    // Ensure the session user matches the submitted data
    if (currentUser.id !== data.user.id) {
      throw new UnauthorizedError(
        "You are not authorized to create an invoice for this user."
      );
    }

    // Verify that the specified business exists
    const existingBusinessDocument = await businessRepository.getById(
      data.business.id
    );

    if (!existingBusinessDocument) {
      throw new ConflictError(
        "The specified business could not be found. Please verify the details and try again."
      );
    }

    //get existing Invoice document
    const invoiceDocument = await invoiceRepository.getById(data.invoice.id);

    if (!invoiceDocument) {
      throw new ConflictError(
        "The specified invoice could not be found. Please verify the details and try again."
      );
    }

    // Create invoice
    try {
      const results = await transactionManagerService.startTransaction(
        async (tx) => {
          try {
            // Insert client into the database
            const updatedClientDocument = await clientRepository.update(
              {
                email: data.client.email,
                name: data.client.name,
              },
              invoiceDocument.clientId,
              tx
            );

            // Insert client address into the database
            const updatedClientAddressDocument =
              await clientAddressRepository.update(
                {
                  clientId: updatedClientDocument.id,
                  addressLine1: data.client.address.addressLine1,
                  addressLine2: data.client.address.addressLine2,
                  city: data.client.address.city,
                  postalCode: data.client.address.postalCode,
                },
                invoiceDocument.clientId,
                tx
              );

            // update invoice into the database
            const updatedInvoiceDocument = await invoiceRepository.update(
              {
                businessId: data.business.id,
                clientId: updatedClientDocument.id,
                description: data.invoice.description,
                dueDate: data.invoice.dueDate,
                issueDate: data.invoice.issueDate,
                totalPrice: data.invoice.grandTotal.toPrecision(),
                totalBasePrice: data.invoice.totalBasePrice.toPrecision(),
                totalDiscount: data.invoice.totalDiscount.toPrecision(),
                totalTax: data.invoice.totalTax.toPrecision(),

                id: data.invoice.id,
              },
              invoiceDocument.id,
              tx
            );

            const existingInvoiceItems = await invoiceItemsRepository.getAll(
              data.invoice.id,
              tx
            );

            // Process new items: either insert or update
            const newItemsList = await Promise.all(
              data.invoiceItems.map(async (item) => {
                // Check if the item already exists in the database
                const existingItem = existingInvoiceItems.find(
                  (existingItem) => existingItem.name === item.name
                );

                if (existingItem) {
                  // If the item exists, update it
                  return await invoiceItemsRepository.update(
                    {
                      price: item.price.toPrecision(),
                      name: item.name,
                      quantity: item.quantity,
                      taxRate: item.taxRate.toPrecision(),
                      discountRate: item.discountRate.toPrecision(),
                      invoiceId: existingItem.invoiceId,
                    },
                    data.invoice.id,
                    tx
                  );
                } else {
                  // If the item doesn't exist, insert it
                  return await invoiceItemsRepository.insert(
                    {
                      invoiceId: data.invoice.id,
                      price: item.price.toPrecision(),
                      name: item.name,
                      quantity: item.quantity,
                      taxRate: item.taxRate.toPrecision(),
                      discountRate: item.discountRate.toPrecision(),
                    },
                    tx
                  );
                }
              })
            );

            return {
              updatedClientDocument,
              updatedClientAddressDocument,
              updatedInvoiceDocument,
              newItemsList,
            };
          } catch (error) {
            tx.rollback();
            throw error;
          }
        }
      );

      return {
        success: true,
        message: "Invoice has been successfully updated.",
        invoice: {
          ...results,
        },
      };
    } catch (error) {
      console.error(`updateInvoiceUseCase::${error}`);
      return {
        success: false,
        message:
          "An unexpected error occurred while processing your request. The transaction could not be completed. Our team has been notified and is addressing the issue. Please try again later.",
      };
    }
  },
};
