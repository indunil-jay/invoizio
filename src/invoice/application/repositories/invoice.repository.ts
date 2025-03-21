import { Transaction } from "@/drizzle";
import { CreateInvoice } from "@/drizzle/schemas/invoices";
import { Invoice } from "@/src/invoice/domain/invoice.entity";

export interface IInvoiceRepository {
    insert(data: CreateInvoice, tx?: Transaction): Promise<Invoice>;
    get(invoiceId: string): Promise<Invoice | null>;
}
