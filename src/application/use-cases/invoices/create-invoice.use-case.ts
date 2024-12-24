import { CreateInvoiceDTO } from "@/src/application/dtos/invoice.dto";
import { UnauthorizedError } from "@/src/infastructure/errors/errors";
import { getInjection } from "@/di/container";
import { checkValidSessionUseCase } from "@/src/application/use-cases/authentication/check-valid-session";
import { ConflictError } from "@/src/domain/errors/errors";
import { INVOICE_STATUS } from "@/src/application/enums/invoice-status.enum";

export const createInvoiceUseCase = async (data: CreateInvoiceDTO) => {
  
  // Dependency injection
  const businessRepository = getInjection("IBusinessRepository");
  const transactionManagerService = getInjection("ITransactionManagerService");
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

  // Create invoice
  try {
    const results = await transactionManagerService.startTransaction(
      async (tx) => {
        try {
          // Insert client into the database
          const newClientDocument = await clientRepository.insert(
            {
              email: data.client.email,
              name: data.client.name,
            },
            tx
          );

          // Insert client address into the database
          const newClientAddressDocument = await clientAddressRepository.insert(
            {
              clientId: newClientDocument.id,
              addressLine1: data.client.address.addressLine1,
              addressLine2: data.client.address.addressLine2,
              city: data.client.address.city,
              postalCode: data.client.address.postalCode,
            },
            tx
          );

          // Insert invoice into the database
          const newInvoiceDocument = await invoiceRepository.insert(
            {
              businessId: data.business.id,
              clientId: newClientDocument.id,
              description: data.invoice.description,
              dueDate: data.invoice.dueDate,
              issueDate: data.invoice.issueDate,
              totalPrice: data.invoice.grandTotal.toPrecision(),
              totalBasePrice: data.invoice.totalBasePrice.toPrecision(),
              totalDiscount: data.invoice.totalDiscount.toPrecision(),
              totalTax: data.invoice.totalTax.toPrecision(),
              statusId: INVOICE_STATUS.PENDING,
              id: data.invoice.id,
            },
            tx
          );

          // Insert invoice items into the database
          const newItemsList = await Promise.all(
            data.invoiceItems.map(
              async (item) =>
                await invoiceItemsRepository.insert(
                  {
                    invoiceId: newInvoiceDocument.id,
                    price: item.price.toPrecision(),
                    productName: item.productName,
                    quantity: item.quantity,
                    taxRate: item.taxRate.toPrecision(),
                    discountRate: item.discountRate.toPrecision(),
                  },
                  tx
                )
            )
          );

          return {
            newClientDocument,
            newClientAddressDocument,
            newInvoiceDocument,
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
      message: "Invoice has been successfully created.",
      invoice: {
        ...results,
      },
    };
  } catch (error) {
    console.error(`createInvoiceUseCase::${error}`);
    return {
      success: false,
      message:
        "An unexpected error occurred while processing your request. The transaction could not be completed. Our team has been notified and is addressing the issue. Please try again later.",
    };
  }
};
