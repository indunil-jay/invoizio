import { injectable } from "inversify";
import { Transaction } from "@/drizzle";
import { CreateInvoiceItem } from "@/drizzle/schemas/invoice-items";
import { IInvoiceItemRepository } from "@/src/invoice/application/repositories/invoice-item.repository";
import { InvoiceItem } from "@/src/invoice/domain/invoice-item.entity";

@injectable()
export class InvoiceItemRepository implements IInvoiceItemRepository {
    insert(data: CreateInvoiceItem, tx?: Transaction): Promise<InvoiceItem> {
        throw new Error("Method not implemented.");
    }
}
