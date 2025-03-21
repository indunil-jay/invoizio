import { getInjection } from "@/di/container";
import { CreateInvoiceDto } from "../dtos/create-invoice.dto";
import { InvoiceCreateUnauthorizedException } from "../execeptions/specific.exception";
import { BusinessNotFoundException } from "@/src/business/application/exceptions/specific.exception";

export const createInvoiceUseCase = {
    async execute({
        user: requestedUser,
        client,
        business,
        invoice,
        invoiceItems,
    }: CreateInvoiceDto) {
        const {
            authenticationService,
            businessRepository,
            transactionManagerService,
            clientAddressFactory,
            clientFactory,
            clientRepository,
            clientAddressRepository,
        } = this.getServices();
        // verify the user
        const user = await authenticationService.verifySessionUser();

        // Ensure the session user matches the submitted data
        if (user.id !== requestedUser.id) {
            throw new InvoiceCreateUnauthorizedException();
        }

        // Verify that the specified business exists
        const existingBusiness = await businessRepository.get(business.id);

        if (!existingBusiness) {
            throw new BusinessNotFoundException();
        }

        //create domain models
        const newClient = clientFactory.create(client.name, client.email);
        const newClientAddress = clientAddressFactory.create(
            newClient.id,
            client.address.addressLine1,
            client.address.city,
            client.address.postalCode,
            client.address.addressLine2
        );

        // inset into database
        transactionManagerService.startTransaction(async (tx) => {
            await clientRepository.insert(newClient, tx);
            await clientAddressRepository.insert(newClientAddress, tx);
        });
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
        };
    },
};
