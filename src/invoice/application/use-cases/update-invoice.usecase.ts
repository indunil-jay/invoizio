import { getInjection } from "@/di/container";
import { UpdateInvoiceDto } from "../dtos/update-invoice.dto";
import { BusinessNotFoundException } from "@/src/business/application/exceptions/specific.exception";
import {
    InvoiceNotFoundException,
    InvoiceUpdateUnauthorizedException,
} from "../execeptions/specific.exception";
import { ClientNotFoundException } from "@/src/client-user/application/exceptions/specific.exception";

export const updateInvoiceUseCase = {
    async execute({
        user: requestedUser,
        client,
        business,
        invoice,
        invoiceItems,
    }: UpdateInvoiceDto) {
        const {
            authenticationService,
            businessRepository,
            transactionManagerService,
            clientRepository,
            clientAddressRepository,
            invoiceFactory,
            clientAddressFactory,
            invoiceRepository,
            invoiceItemFactory,
            invoiceItemRepository,
        } = this.getServices();

        // verify the user
        const user = await authenticationService.verifySessionUser();

        // Ensure the session user matches the submitted data
        if (user.id !== requestedUser.id) {
            throw new InvoiceUpdateUnauthorizedException();
        }

        // Verify that the specified business exists
        const existingBusiness = await businessRepository.get(business.id);
        if (!existingBusiness) {
            throw new BusinessNotFoundException();
        }

        // Verify that the invoice exists

        const existingInvoice = await invoiceRepository.get(invoice.id);
        if (!existingInvoice) {
            throw new InvoiceNotFoundException();
        }

        //update the client address if it is modified
        const existingClient = await clientRepository.get(
            existingInvoice.clientId
        );

        if (!existingClient || !existingClient.address) {
            throw new ClientNotFoundException();
        }

        // Check if the client address  is changed

        if (
            (client.address.addressLine1 !==
                existingClient.address?.addressLine1 ||
                client.address.addressLine2 !==
                    existingClient.address?.addressLine2 ||
                client.address.city !== existingClient.address?.city,
            client.address.postalCode !== existingClient.address?.postalCode)
        ) {
            await clientAddressRepository.update(existingClient.address.id, {
                addressLine1: client.address.addressLine1,
                addressLine2: client.address.addressLine2,
                city: client.address.city,
                postalCode: client.address.postalCode,
            });
        }

        //TODO:

        //check if description and dueDate and issueDate is changed, then update
        //check if invoice items are changed and update
        //update the invoice
    },

    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            businessRepository: getInjection("IBusinessRepository"),
            transactionManagerService: getInjection(
                "ITransactionManagerService"
            ),
            clientFactory: getInjection("IClientFactory"),
            clientAddressFactory: getInjection("IClientAddressFactory"),
            clientRepository: getInjection("IClientRepository"),
            clientAddressRepository: getInjection("IClientAddressRepository"),
            invoiceFactory: getInjection("IInvoiceFactory"),
            invoiceItemFactory: getInjection("IInvoiceItemFactory"),
            invoiceRepository: getInjection("IInvoiceRepository"),
            invoiceItemRepository: getInjection("IInvoiceItemRepository"),
        };
    },
};
