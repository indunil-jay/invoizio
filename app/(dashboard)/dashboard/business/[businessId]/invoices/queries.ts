"use server";
import { executeQuery } from "@/app/_utils/execute.queries";
import { getAllBusinessInvoicesController } from "@/src/invoice/presenter/controllers/get-all-business-invoices.controller";
import { Invoice } from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/_utils/types";

export const getAllBusinessInvoices = (businessId: string) => {
    return executeQuery<Invoice[] | []>({
        queryFn: async () =>
            JSON.parse(await getAllBusinessInvoicesController(businessId)),
    });
};
