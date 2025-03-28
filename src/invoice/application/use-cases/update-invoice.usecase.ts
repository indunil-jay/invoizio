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
            invoiceRepository,
            invoiceItemRepository,
        } = this.getServices();

        const user = await authenticationService.verifySessionUser();
        if (user.id !== requestedUser.id) {
            throw new InvoiceUpdateUnauthorizedException();
        }

        const existingBusiness = await businessRepository.get(business.id);
        if (!existingBusiness) {
            throw new BusinessNotFoundException();
        }

        const existingInvoice = await invoiceRepository.get(invoice.id);
        if (!existingInvoice) {
            throw new InvoiceNotFoundException();
        }

        const existingClient = await clientRepository.get(
            existingInvoice.clientId
        );
        if (!existingClient || !existingClient.address) {
            throw new ClientNotFoundException();
        }

        await transactionManagerService.startTransaction(async (tx) => {
            if (
                client.address.addressLine1 !==
                    existingClient.address?.addressLine1 ||
                client.address.addressLine2 !==
                    existingClient.address.addressLine2 ||
                client.address.city !== existingClient.address.city ||
                client.address.postalCode !== existingClient.address.postalCode
            ) {
                await clientAddressRepository.update(
                    existingClient.address!.id,
                    {
                        addressLine1: client.address.addressLine1,
                        addressLine2: client.address.addressLine2,
                        city: client.address.city,
                        postalCode: client.address.postalCode,
                    },
                    tx
                );
            }

            const existingInvoiceItems = await invoiceItemRepository.getAll(
                invoice.id
            );

            const existingItemIds = new Set(
                existingInvoiceItems.map((item) => item.id)
            );
            const newItemIds = new Set(invoiceItems.map((item) => item.id));

            for (const item of invoiceItems) {
                if (!existingItemIds.has(item.id)) {
                    await invoiceItemRepository.create({
                        ...item,
                        invoiceId: invoice.id,
                    });
                } else {
                    await invoiceItemRepository.update(item.id, item);
                }
            }

            for (const existingItem of existingInvoiceItems) {
                if (!newItemIds.has(existingItem.id)) {
                    await invoiceItemRepository.delete(existingItem.id);
                }
            }
        });
    },

    getServices() {
        return {
            authenticationService: getInjection("IAuthenticationService"),
            businessRepository: getInjection("IBusinessRepository"),
            transactionManagerService: getInjection(
                "ITransactionManagerService"
            ),
            clientRepository: getInjection("IClientRepository"),
            clientAddressRepository: getInjection("IClientAddressRepository"),
            invoiceRepository: getInjection("IInvoiceRepository"),
            invoiceItemRepository: getInjection("IInvoiceItemRepository"),
        };
    },
};
