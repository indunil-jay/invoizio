import { Transaction } from "@/drizzle";
import { CreateInvoice } from "@/drizzle/schemas/invoices";
import { Invoice } from "@/src/invoice/domain/invoice.entity";

export interface IInvoiceRepository {
    insert(data: CreateInvoice, tx?: Transaction): Promise<Invoice>;
    get(invoiceId: string): Promise<Invoice | null>;
    getAll(businessId: string): Promise<Invoice[] | []>;
    remove(invoiceId: string): Promise<void>;
    update(
        invoiceId: string,
        properties: Pick<CreateInvoice, "statusId">
    ): Promise<Invoice>;
}
