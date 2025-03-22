import { getInjection } from "@/di/container";
import { CreateInvoiceDto } from "../dtos/create-invoice.dto";
import { InvoiceCreateUnauthorizedException } from "../execeptions/specific.exception";
import { BusinessNotFoundException } from "@/src/business/application/exceptions/specific.exception";
import { INVOICE_STATUS } from "../enums/invoice-status.enum";

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
            invoiceFactory,
            invoiceRepository,
            invoiceItemFactory,
            invoiceItemRepository,
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
        const newInvoice = invoiceFactory.create(
            invoice.id,
            business.id,
            newClient.id,
            invoice.description,
            invoice.issueDate,
            invoice.dueDate,
            invoice.grandTotal.toPrecision(2),
            invoice.totalBasePrice.toPrecision(2),
            invoice.totalDiscount.toPrecision(2),
            invoice.totalTax.toPrecision(2),
            INVOICE_STATUS.PENDING
        );

        const newItemList = invoiceItems.map((item) =>
            invoiceItemFactory.create(
                newInvoice.id,
                item.name,
                item.price.toPrecision(2),
                item.quantity,
                item.taxRate.toPrecision(2),
                item.discountRate.toPrecision(2)
            )
        );

        // inset into database
        await transactionManagerService.startTransaction(async (tx) => {
            try {
                await clientRepository.insert(newClient, tx);
                await clientAddressRepository.insert(newClientAddress, tx);
                await invoiceRepository.insert(newInvoice, tx);
                await Promise.all(
                    newItemList.map(
                        async (item) =>
                            await invoiceItemRepository.insert(item, tx)
                    )
                );
            } catch (error) {
                console.log("TRANSACTION ERROR WHILE CREATEING INVOICE", error);
                tx.rollback();
                throw error;
            }
        });

        //send email to client with,creation details and PDF
        //...TODO:
        const invoiceDoc = await invoiceRepository.get(newInvoice.id);
        if (!invoiceDoc) throw new Error("Invoice not found");
        return invoiceDoc;
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
