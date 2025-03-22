"use server";
import { executeQuery } from "@/app/_utils/execute.queries";
import { InvoiceType } from "@/shared/types/invoice-response-type";
import { getAllBusinessInvoicesController } from "@/src/invoice/presenter/controllers/get-all-business-invoices.controller";

export const getAllBusinessInvoices = (businessId: string) => {
    return executeQuery<InvoiceType[] | []>({
        queryFn: async () =>
            JSON.parse(await getAllBusinessInvoicesController(businessId)),
    });
};
