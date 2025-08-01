import { Transaction } from "@/drizzle";
import {
    CreateInvoice,
    InvoiceEntityWithAllRelations,
} from "@/drizzle/schemas/invoices";
import { Invoice } from "@/src/invoice/domain/invoice.entity";

export interface IInvoiceRepository {
    insert(data: CreateInvoice, tx?: Transaction): Promise<Invoice>;
    get(invoiceId: string): Promise<Invoice | null>;
    getAll(businessId: string): Promise<InvoiceEntityWithAllRelations[] | []>;
    remove(invoiceId: string): Promise<void>;
    update(
        invoiceId: string,
        properties: Partial<CreateInvoice>
    ): Promise<Invoice>;
    getDetailsInvoice(
        invoiceId: string
    ): Promise<InvoiceEntityWithAllRelations | null>;
}
