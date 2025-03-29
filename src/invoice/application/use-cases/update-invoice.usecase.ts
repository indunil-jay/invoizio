import { getInjection } from "@/di/container";
import { UpdateInvoiceDto } from "../dtos/update-invoice.dto";
import {
    InvoiceNotFoundException,
    InvoiceUpdateUnauthorizedException,
} from "../execeptions/specific.exception";

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

            invoiceFactory,
            invoiceRepository,
            clientAddressRepository,
            invoiceItemRepository,
            invoiceItemFactory,
            transactionManagerService,
        } = this.getServices();
        //verify the session
        const user = await authenticationService.verifySessionUser();
        //check if user has update ability
        if (user.id !== requestedUser.id) {
            throw new InvoiceUpdateUnauthorizedException();
        }
        //check if invoice id is exists.
        const existingInvoice = await invoiceRepository.getDetailsInvoice(
            invoice.id
        );
        if (!existingInvoice) {
            throw new InvoiceNotFoundException();
        }

        await transactionManagerService.startTransaction(async (tx) => {
            try {
                //check if client address being changed if so update that
                if (
                    existingInvoice.client.address.addressLine1 !==
                        client.address.addressLine1 ||
                    existingInvoice.client.address.addressLine2 !==
                        client.address.addressLine2 ||
                    existingInvoice.client.address.city !==
                        client.address.city ||
                    existingInvoice.client.address.postalCode !==
                        client.address.postalCode
                ) {
                    await clientAddressRepository.update(
                        existingInvoice.client.address.id,
                        client.address,
                        tx
                    );
                }

                // if so check invoice items are changed.(check ids are equals, if changed, delete already in database but not inside the update query invoice item, add new  to the database)
                const receivedIds = invoiceItems.map((item) => item.id);
                const existingIds = existingInvoice.invoiceItems.map(
                    (item) => item.id
                );

                const equals =
                    receivedIds.length === existingIds.length &&
                    receivedIds.every(
                        (value, index) => value === existingIds[index]
                    );

                if (!equals) {
                    // Find invoice items that need to be deleted (those that are in the database but not in the updated request)
                    const itemsToDelete = existingInvoice.invoiceItems.filter(
                        (item) => !receivedIds.includes(item.id)
                    );
                    const itemsToAdd = invoiceItems.filter(
                        (item) =>
                            !existingInvoice.invoiceItems.some(
                                (dbItem) => dbItem.id === item.id
                            )
                    );

                    if (itemsToDelete) {
                        await Promise.all(
                            itemsToDelete.map(
                                async (item) =>
                                    await invoiceItemRepository.remove(
                                        item.id,
                                        tx
                                    )
                            )
                        );
                    }
                    if (itemsToAdd) {
                        const newItemList = invoiceItems.map((item) =>
                            invoiceItemFactory.create(
                                item.id!,
                                invoice.id,
                                item.name,
                                item.price.toPrecision(2),
                                item.quantity,
                                item.taxRate.toPrecision(2),
                                item.discountRate.toPrecision(2)
                            )
                        );

                        await Promise.all(
                            newItemList.map(
                                async (item) =>
                                    await invoiceItemRepository.insert(item, tx)
                            )
                        );
                    }

                    //update the invoice
                    const updateInvoice = invoiceFactory.create(
                        invoice.id,
                        business.id,
                        existingInvoice.clientId,
                        invoice.description,
                        invoice.issueDate,
                        invoice.dueDate,
                        invoice.grandTotal.toString(),
                        invoice.totalBasePrice.toString(),
                        invoice.totalDiscount.toString(),
                        invoice.totalTax.toString(),
                        existingInvoice.statusId
                    );

                    await invoiceRepository.update(invoice.id, updateInvoice);
                }
            } catch (error) {
                console.log("TRANSACTION ERROR WHILE UPDATE INVOICE", error);
                tx.rollback();
                throw error;
            }
        });

        //TODO: send to the client updated email
        console.log("ALL DONE");
    },

    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            businessRepository: getInjection("IBusinessRepository"),
            invoiceRepository: getInjection("IInvoiceRepository"),
            invoiceFactory: getInjection("IInvoiceFactory"),
            clientAddressRepository: getInjection("IClientAddressRepository"),
            invoiceItemRepository: getInjection("IInvoiceItemRepository"),
            invoiceItemFactory: getInjection("IInvoiceItemFactory"),
            transactionManagerService: getInjection(
                "ITransactionManagerService"
            ),
        };
    },
};
