import { Transaction } from "@/drizzle";
import { CreateInvoiceItem } from "@/drizzle/schemas/invoice-items";
import { InvoiceItem } from "@/src/invoice/domain/invoice-item.entity";

export interface IInvoiceItemRepository {
    insert(data: CreateInvoiceItem, tx?: Transaction): Promise<InvoiceItem>;
    remove(itemId: string, tx?: Transaction): Promise<void>;
    getAll(invoiceId: string, tx?: Transaction): Promise<InvoiceItem[] | []>;
}
