import { InvoiceEntityWithAllRelations } from "@/drizzle/schemas/invoices";
import { InvoiceType } from "@/shared/types/invoice-response-type";
import { getAllBusinessInvoicesUseCase } from "@/src/invoice/application/use-cases/get-all-business-invoices.usecase";

const presenter = (
    invoices: InvoiceEntityWithAllRelations[] | []
): InvoiceType[] | [] => {
    const formatedInvoices: InvoiceType[] | [] = invoices.map((i) => ({
        id: i.id,
        business: i.business,
        client: i.client,
        description: i.description,
        invoiceItems: i.invoiceItems,
        dueDate: i.dueDate,
        issueDate: i.issueDate,
        createdAt: i.createdAt,
        updatedAt: i.updatedAt,
        lastEmailSentAt: i.lastEmailSentAt,
        status: i.status,
        totalBasePrice: i.totalBasePrice,
        totalDiscount: i.totalDiscount,
        totalPrice: i.totalPrice,
        totalTax: i.totalTax,
    }));
    return formatedInvoices;
};

export const getAllBusinessInvoicesController = async (businessId: string) => {
    const invoices = await getAllBusinessInvoicesUseCase.execute(businessId);
    return presenter(invoices);
};
