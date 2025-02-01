import { getInjection } from "@/di/container";
import { checkValidSessionUseCase } from "../authentication/check-valid-session";
import { NotFoundError } from "@/src/domain/errors/errors";
import {
    DataBaseError,
    UnauthorizedError,
} from "@/src/infastructure/errors/errors";

export const deleteInvoiceByIdUseCase = async (invoiceId: string) => {
    // Dependency injection
    const invoicesRepository = getInjection("IInvoiceRepository");
    const businessRepository = getInjection("IBusinessRepository");
    const transactionManagerService = getInjection(
        "ITransactionManagerService"
    );
    const clientsRepository = getInjection("IClientRepository");
    // Check user session
    const sessionUser = await checkValidSessionUseCase.execute();

    // Retrieve invoice by ID
    const existingInvoiceDocument = await invoicesRepository.getById(invoiceId);

    if (!existingInvoiceDocument) {
        throw new NotFoundError(
            "The requested invoice does not exist. Please verify the invoice ID and try again."
        );
    }

    // Retrieve associated business
    const businessDocument = await businessRepository.getById(
        existingInvoiceDocument.businessId
    );

    if (!businessDocument) {
        throw new NotFoundError(
            "The business associated with the invoice could not be found. Please verify and try again."
        );
    }

    // Check user permissions
    if (businessDocument.userId !== sessionUser.id) {
        throw new UnauthorizedError(
            "You do not have permission to delete this invoice."
        );
    }

    try {
        transactionManagerService.startTransaction(async (tx) => {
            // Delete the invoice
            await invoicesRepository.deleteById(invoiceId, tx);
            await clientsRepository.deleteById(
                existingInvoiceDocument.clientId,
                tx
            );
        });
        return {
            success: true,
            message: "The invoice has been successfully deleted.",
        };
    } catch (error) {
        console.log(`error deleting invoice`, error);
        throw new DataBaseError();
    }
};
