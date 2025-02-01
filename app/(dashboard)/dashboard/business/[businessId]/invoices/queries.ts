"use server";
import { executeQuery } from "@/app/_lib/execute.queries";
import { getClientByIdController } from "@/src/interface-adapter/controllers/clients/get-client-by-id.controller";
import { getAllInvoiceItemsByInvoiceIdController } from "@/src/interface-adapter/controllers/invoice/get-all-invoice-items-by-invoice-id.controller";
import { getAllInvoicesByBusinessIdController } from "@/src/interface-adapter/controllers/invoice/get-all-invoices-by-business-id.controller";
import { getInvoiceByIdController } from "@/src/interface-adapter/controllers/invoice/get-invoice-by-id.controller";
import { getUserByIdController } from "@/src/interface-adapter/controllers/user/get-user-by-id.controller";

export const getAllInvoicesByBusinessId = (businessId: string) => {
    return executeQuery({
        queryFn: async () =>
            await getAllInvoicesByBusinessIdController(businessId),
    });
};

export const getInvoiceById = (invoiceId: string) => {
    return executeQuery({
        queryFn: async () => await getInvoiceByIdController(invoiceId),
    });
};

export const getUserById = (userId: string) => {
    return executeQuery({
        queryFn: async () => await getUserByIdController(userId),
    });
};

export const getClientById = (clientId: string) => {
    return executeQuery({
        queryFn: async () => await getClientByIdController(clientId),
    });
};

export const getAllInvoiceItemsByInvoiceId = (invoiceId: string) => {
    return executeQuery({
        queryFn: async () =>
            await getAllInvoiceItemsByInvoiceIdController(invoiceId),
    });
};
